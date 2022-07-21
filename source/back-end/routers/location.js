var express = require('express')
var router = express.Router()

var api = require('../api/api_location')

router.post('/getCityList', function (req, res) {
    api.get_city_list(req, res)
})

router.post('/getRegionList', function (req, res) {
    api.get_region_list(req, res)
})

// admin

router.post('/getBranchList', function (req, res) {
    api.get_branch_list(req, res)
})

router.post('/transferCopy', function (req, res) {
    api.transfer_copy(req, res)
})

router.post('/getInTransferByBranch', function (req, res) {
    api.get_in_transfer_by_branch(req, res)
})

router.post('/getOutTransferByBranch', function (req, res) {
    api.get_out_transfer_by_branch(req, res)
})



module.exports = router