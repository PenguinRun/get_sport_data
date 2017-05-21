var SportPlace = require('../models/sport_place_model');

module.exports = class GetData {
  getSportPlace(req, res, next) {
    var lat = req.body.lat;
    var lon = req.body.lon;
    // var lat = 23.080478;
    // var lon = 120.286805;

    if (check(lat) === true){
      res.json({
        err: "請輸入緯度資料"
      })
      return;
    }else if (check(lon) === true){
      res.json({
        err: "請輸入經度資料"
      })
      return;
    }

    if (lat > 90.0) {
      res.json({
        err: "緯度錯誤"
      })
      return;
    } else if (lon > 180.0) {
      res.json({
        err: "經度錯誤"
      })
      return;
    }
    var sportPlace = new SportPlace();
    sportPlace.sportPlaceData(lat, lon).then(
      function(result) {
        res.json({
          result: result
        })
      }
    ).catch(function(err) {
      res.json({
        err: err
      })
    })
  }
}


function check(data) {
  if (data === null || data == "" || typeof data === "undefined") {
    return true;
  }
  return false;
}
