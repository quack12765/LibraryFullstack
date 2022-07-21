var express = require('express')
var router = express.Router()

var api = require('../api/api_accounts')

router.post('/login', function (req, res) {
  api.login(req, res)
})

router.get('/select_accounts', function (req, res) {
  api.select_accounts(req, res)
})

router.post('/insert_accounts', function (req, res) {
  api.insert_accounts(req, res)
})

router.patch('/update_accounts', function (req, res) {
  api.update_accounts(req, res)
})

router.patch('/update_password', function (req, res) {
  api.update_password(req, res)
})

router.post('/update_password_by_old_password', function (req, res) {
  api.update_password_by_old_password(req, res)
})

router.post('/delete_accounts', function (req, res) {
  api.delete_accounts(req, res)
})

router.post('/getAccountInfoByAccount', function (req, res) {
  api.get_account_info_by_account(req, res)
})

router.post('/saveAccountInfo', function (req, res) {
  api.save_account_info(req, res)
})



module.exports = router
