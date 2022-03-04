//console.log('Client-side javascript loaded');

const getWeatherData = (address) => {
    const msg = document.getElementById('err-msg');
    const res = document.getElementById('results');
    const url = '/weather?address=' + encodeURIComponent(address);
    try {
        fetch(url).then((response) => {
            try {
                response.json().then((data) => {
                    if (data.error) {
                        msg.innerHTML = data.error;
                    } else {
                        msg.innerHTML = "&nbsp;";
                        res.innerHTML = formatWeatherData(data);
                    }
                });
            } catch(e) {
                console.log('Error calling response.json():', e);
                msg.innerHTML = 'Internal error';
            }
        });
    } catch(e) {
        console.log('Error calling fetch(url):', e);
        msg.innerHTML = 'Internal error';
    }
}

const formatWeatherData = (data) => {
    let html = '';
        html += '<h2>Weather for ' + data.city + ', ' + data.state + '<br>' + data.country + '....</h2><br>';
        data.weather.forEach((descr) => {
            html += '<h3>' + descr + '</h3><br>';
        });
        html += 'The temperature is currently ' + data.temp + ' &deg;f.' + '<br>';
        html += 'The wind is ' + data.windDir + ' at ' + data.windSpeed + ' mph.' + '<br><br>';
        if (!data.sunrise == '') {
            html += 'Sunrise: ' + data.sunrise + '<br>';
            html += 'Sunset: ' + data.sunset + '<br>';
            html += 'High: ' + data.highTemp + ' &deg;f <br>';
            html += 'Low: ' + data.lowTemp + ' &deg;f <br>'; 
        }
    return html;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('address-input-button').addEventListener('click', () => {
        getWeatherData(document.getElementById('address-input').value);
    });
    document.getElementById('address-input').addEventListener('focus', () => {
        document.getElementById('err-msg').innerHTML = "&nbsp;";
    });
    document.addEventListener('keypress', (e) => {
        if (e.charCode === 13) {
           getWeatherData(document.getElementById('address-input').value); 
        }
    });
});