const request = require('postman-request');

const getCurrentWeather = (latLong, callback) => {
  // Weatherstack API...
  const access_key='268d260238180e855ec358d111e95634';
  const baseUrl = 'http://api.weatherstack.com/current?access_key='+access_key;
  const units = 'f'; // for Fahrenheit
  const url = baseUrl+'&query='+latLong+'&units='+units;
  try {
      request({url, json: true}, (e, r, b) => { // error, response, body (passed into the callback)
        if (e) {
            // if request errors...
            callback('getCurrentWeather() HTTP request error', undefined);
        } else {
            if (r.statusCode == 200) {
                // if no response status error code...
                if (b.error !== undefined) { // error response with successful API call
                    if (b.error.code !== undefined && b.error.info !== undefined) {
                        callback('getCurrentWeather() error: ' + b.error.code + ' ' + b.error.info, undefined);
                    }
                } else {
                    // if no API call errors...
                    callback(undefined, b);
                }
            } else {
                // if response status error code...
                if (b.error !== undefined) {
                    if (b.error.code !== undefined && b.error.info !== undefined) {
                        callback('getCurrentWeather() error: ' + b.error.code + ' ' + b.error.info, undefined);
                    }
                } else {
                    callback('getCurrentWeather() unknown error', undefined);
                }
            }
        }
    });
  } catch(e) {
    // if function call errors...
    callback('getCurrentWeather() function call error', undefined);
  } 
}
            
module.exports = {getCurrentWeather: getCurrentWeather};

/* RESPONSE BODY...
{
    "request": {
        "type": "City",
        "query": "New York, United States of America",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "New York",
        "country": "United States of America",
        "region": "New York",
        "lat": "40.714",
        "lon": "-74.006",
        "timezone_id": "America/New_York",
        "localtime": "2019-09-07 08:14",
        "localtime_epoch": 1567844040,
        "utc_offset": "-4.0"
    },
    "current": {
        "observation_time": "12:14 PM",
        "temperature": 13,
        "weather_code": 113,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        "weather_descriptions": [
            "Sunny"
        ],
        "wind_speed": 0,
        "wind_degree": 349,
        "wind_dir": "N",
        "pressure": 1010,
        "precip": 0,
        "humidity": 90,
        "cloudcover": 0,
        "feelslike": 13,
        "uv_index": 4,
        "visibility": 16
    }
}
*/