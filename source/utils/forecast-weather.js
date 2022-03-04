const request = require('postman-request');

const getWeatherForecast = (latLong, callback) => {
  // Weatherstack API...
  const access_key='268d260238180e855ec358d111e95634';
  const baseUrl = 'http://api.weatherstack.com/forecast?access_key='+access_key;
  const units = 'f'; // for Fahrenheit
  const url = baseUrl+'&query='+latLong+'&units='+units;
  try {
      request({url, json: true}, (e, r, b) => { // error, response, body (passed into the callback)
        if (e) {
            // if request errors...
            callback('getWeatherForecast() HTTP request error', undefined);
        } else {
            if (r.statusCode == 200) {
                // if no response status error code...
                if (b.error !== undefined) { // error response with successful API call
                    if (b.error.code !== undefined && b.error.info !== undefined) {
                        callback('getWeatherForecast() error: ' + b.error.code + ' ' + b.error.info, undefined);
                    }
                } else {
                    // if no API call errors...
                    callback(undefined, b);
                }
            } else {
                // if response status error code...
                if (b.error !== undefined) {
                    if (b.error.code !== undefined && b.error.info !== undefined) {
                        callback('getWeatherForecast() error: ' + b.error.code + ' ' + b.error.info, undefined);
                    }
                } else {
                    callback('getWeatherForecast() unknown error', undefined);
                }
            }
        }
    });
  } catch(e) {
    // if function call errors...
    callback('getWeatherForecast() function call error', undefined);
  } 
}
            
module.exports = {getWeatherForecast: getWeatherForecast};

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
        "localtime": "2019-09-07 11:38",
        "localtime_epoch": 1567856280,
        "utc_offset": "-4.0"
    },
    "current": {
        "observation_time": "03:38 PM",
        "temperature": 18,
        "weather_code": 113,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        "weather_descriptions": [
            "Sunny"
        ],
        "wind_speed": 0,
        "wind_degree": 345,
        "wind_dir": "NNW",
        "pressure": 1011,
        "precip": 0,
        "humidity": 58,
        "cloudcover": 0,
        "feelslike": 18,
        "uv_index": 5,
        "visibility": 16
    },
    "forecast": {
        "2019-09-07": {
            "date": "2019-09-07",
            "date_epoch": 1567814400,
            "astro": {
                "sunrise": "06:28 AM",
                "sunset": "07:19 PM",
                "moonrise": "03:33 PM",
                "moonset": "12:17 AM",
                "moon_phase": "First Quarter",
                "moon_illumination": 54
            },
            "mintemp": 17,
            "maxtemp": 25,
            "avgtemp": 21,
            "totalsnow": 0,
            "sunhour": 10.3,
            "uv_index": 5,
            "hourly": [
                {
                    "time": "0",
                    "temperature": 18,
                    "wind_speed": 28,
                    "wind_degree": 15,
                    "wind_dir": "NNE",
                    "weather_code": 122,
                    "weather_icons": [
                        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
                    ],
                    "weather_descriptions": [
                        "Overcast"
                    ],
                    "precip": 0,
                    "humidity": 68,
                    "visibility": 10,
                    "pressure": 1008,
                    "cloudcover": 75,
                    "heatindex": 18,
                    "dewpoint": 12,
                    "windchill": 18,
                    "windgust": 35,
                    "feelslike": 18,
                    "chanceofrain": 0,
                    "chanceofremdry": 87,
                    "chanceofwindy": 0,
                    "chanceofovercast": 90,
                    "chanceofsunshine": 15,
                    "chanceoffrost": 0,
                    "chanceofhightemp": 0,
                    "chanceoffog": 0,
                    "chanceofsnow": 0,
                    "chanceofthunder": 0,
                    "uv_index": 0
                },
                {   "time": "300", ...   },
                {   "time": "600", ...   },
                // 6 more items
            ]
        }
    }
}

*/