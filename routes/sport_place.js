var express = require('express');
var router = express.Router();

var GetData = require('../controllers/data_controller');

var getData = new GetData();

/* GET home page. */
router.post('/sportPlace', getData.getSportPlace);

module.exports = router;
