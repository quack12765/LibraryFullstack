var express = require('express')
var router = express.Router()

var api = require('../api/api_location')

router.post('/getCityList', function (req, res) {
    api.get_city_list(req, res)
})

router.post('/getRegionList', function (req, res) {
    api.get_region_list(req, res)
})

module.exports = router