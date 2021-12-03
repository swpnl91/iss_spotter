/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
//const { isPromise } = require('util/types');


const fetchMyIP = function(callback) {
// use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, response, body) => {

    if (error) {
      return callback(error, null);
      
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const data = JSON.parse(body);
    return callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://api.freegeoip.app/json/${ip}?apikey=6f56dab0-53ce-11ec-a866-6fb3cc212163`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching co-ordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body);

    callback(null, {latitude, longitude});
    return;

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const arr = JSON.parse(body).response;

    callback(null, arr);
    

  });
};




const nextISSTimesForMyLocation = function(callback) {
 
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null); 
    };

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null); 
      }
      
      fetchISSFlyOverTimes(coords, (error, arr) => {
        if (error) {
          return callback(error, null); 
        }

        callback (null, arr);

      });


    });
  });
};


module.exports = { nextISSTimesForMyLocation };

