// index.js
const { nextISSTimesForMyLocation } = require('./iss');


/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('99.239.18.36', (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Coords:' , coords);

});

fetchISSFlyOverTimes({latitude: 43.6882, longitude: -79.4539}, (error, arr) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! ISS flyover times are:' , arr);

}); */


nextISSTimesForMyLocation((error, arr) => {

  if (error) {
    console.log("Messed up");
  }

  for (const elem of arr) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(elem.risetime);
    const duration = elem.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
  //console.log(arr);
});

//https://iss-pass.herokuapp.com/json/?lat=43.6882&lon=-79.4539