const request = require('postman-request');

const geocode = (address, callback) => {
    // Mapbox geocode API...
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2ltYmVsanczMzMiLCJhIjoiY2wwOW9hZ3o4MGYyazNqcDlwM2NkZ2M2ZSJ9.Pl4I_StoAkUAdHnJeXevvg&limit=1';
    try {
        request({url, json: true}, (e, r, b) => { // error, response, body (passed into the callback)
            if (e) {
                callback("geocode() unable to connect to location services", undefined);
            } else if (b.features.length === 0) {
                callback("geocode() unable to find location", undefined);
            } else {
                const latLongArray = b.features[0].center;
                const latLong = latLongArray[1] + ',' + latLongArray[0];
                callback(undefined, latLong);
            }
        });
    } catch(e) {
        callback("geocode() function call error", undefined);
    }
}

module.exports = {geocode: geocode};