const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeAPI = require('./utils/geocode.js');
const currentWeatherAPI = require('./utils/current-weather.js');
const weatherForecastAPI = require('./utils/forecast-weather.js');
const getDates = require('./utils/get-dates.js');
// express is a function
//   that must be called to create a new express application
const app = express();

// to deploy on heroku => define port (as heroku provided env var)...
const port = process.env.PORT || 3000;


// define paths to root and 'views'
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../pages/views');
const partialsPath = path.join(__dirname, '../pages/partials');


// add handlebars (hbs) to express 
// and define custom 'views' directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);




// setup static directory to serve
app.use(express.static(publicDirPath));


// getting prebuilt html pages... (can include client-side js that calls to node server for data)
//  (use .html files in root)



// getting handlebars (hbs) views... (remove corresponding .html file)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        paragraph: 'Get a weather report for a location...'
    });
});

app.get('/home', (req, res) => {
    res.render('index', {
        title: 'Weather',
        paragraph: 'Get a weather report for your location...'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        creator: 'John Gimbel',
        paragraph: 'This weather app was created with love ;)'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        paragraph: 'To get a weather report for a location, enter a full address, a city, a city and state, a zip code, or a city and country.'
    });
});






// getting data returned...
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide an address"
        });
    } else {
        const address = req.query.address;
        geocodeAPI.geocode(address, (e, b) => {
            if (e) {
                res.send({error: e});
            } else {
                const latLong = b;
                currentWeatherAPI.getCurrentWeather(latLong, (e, b) => {
                    if (e) {
                        res.send({error: e});
                    } else {
                        const city = b.location.name;
                        const state = b.location.region;
                        const country = b.location.country;
                        const weather = b.current.weather_descriptions;
                        const temp = b.current.temperature;
                        const windDir = b.current.wind_dir;
                        const windSpeed = b.current.wind_speed;
                        weatherForecastAPI.getWeatherForecast(latLong, (e, b) => {
                            if (e) {
                                res.send({error: e});
                            } else {
                                const forecastDate = getDates.getYesterdaysDate(); // workaround for not having forecasts in my subscription
                                const todaysDate = getDates.getTodaysDate();       // workaround for not having forecasts in my subscription
                                let forecast = '';
                                let sunrise = '';
                                let sunset = '';
                                let highTemp = '';
                                let lowTemp = '';
                                if (b.forecast[forecastDate] !== undefined) {
                                    forecast = b.forecast[forecastDate];
                                } else if (b.forecast[todaysDate] !== undefined) {
                                    forecast = b.forecast[todaysDate];   
                                }
                                if (forecast !== '') {
                                    sunrise = forecast.astro.sunrise;
                                    sunset = forecast.astro.sunset;
                                    highTemp = forecast.maxtemp;
                                    lowTemp = forecast.mintemp;
                                }
                                res.send({
                                    address,
                                    city,
                                    state,
                                    country,
                                    weather,
                                    temp,
                                    windDir,
                                    windSpeed,
                                    sunrise,
                                    sunset,
                                    highTemp,
                                    lowTemp
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});





// call this get() next to last for custom 404 page to serve a specific folder route
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'We\'re Sorry',
        paragraph: 'The about page you\'re looking for was not found.',
        path: 'about'
    });
});

// call this get() next to last for custom 404 page to serve a specific folder route
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'We\'re Sorry',
        paragraph: 'The help page you\'re looking for was not found.',
        path: 'help'
    });
});

// call this get() last for default 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'We\'re Sorry',
        paragraph: 'The page you\'re looking for was not found.',
        path: 'home'
    });
});







// initialize server at end of code to initialize app on file call... 
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
// server will stay running (use ctrl-c to stop from cmd prompt)