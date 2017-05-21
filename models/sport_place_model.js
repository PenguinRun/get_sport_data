var jsonData = require('../data/sport_place');

module.exports = class SportPlace {
  sportPlaceData(lat, lon) {
    var sportJson = jsonData;
    var name = [];
    var address = [];

    return new Promise(function(resolve, reject) {

      for (var i = 0; i < sportJson.length; i++) {
        // console.log(sportJson[i].LatLng);
        var resultObj = {};
        var lat2 = (sportJson[i].LatLng).substring(0, sportJson[i].LatLng.indexOf(","));
        var lon2 = (sportJson[i].LatLng).substring(sportJson[i].LatLng.indexOf(",") + 1, 99);
        // console.log(distance(lat, lon, lat2, lon2));
        if (distance(lat, lon, lat2, lon2) <= 5) {
          name.push(sportJson[i].Name);
          address.push(sportJson[i].Address);
        }
      }

      if (name.length === 0){
        reject("不好意思，5公里內沒有資料。");
      }

      var resultArray = [];
      for (var i = 0; i < name.length; i++) {
        var resultObj = {};
        resultObj.name = name[i];
        resultObj.address = address[i];
        resultArray.push(resultObj);
      }
      // console.log(resultArray);

      resolve(resultArray);
    });
  }
}


function distance(lat1, lon1, lat2, lon2) {
  var R = 6378.39; // km (change this constant to get miles)
  var result = R * Math.acos(Math.sin(lat1 * 3.1416 / 180.) * Math.sin(lat2 * 3.1416 / 180.) +
    Math.cos(lat1 * 3.1416 / 180.) * Math.cos(lat2 * 3.1416 / 180.) * Math.cos(lon1 * 3.1416 / 180. - lon2 * 3.1416 / 180.));

  return result;
}
