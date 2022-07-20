var express = require('express')
var router = express.Router()

var api = require('../api/api_comment')

router.post('/addCommentByAccount', function (req, res) {
    api.add_comment_by_account(req, res)
})
router.post('/delCommentByAccount', function (req, res) {
    api.del_comment_by_account(req, res)
})
router.post('/getAllCommentsByISBN', function (req, res) {
    api.get_all_comments_by_ISBN(req, res)
})
router.post('/getPersonalComment', function (req, res) {
    api.get_personal_comment(req, res)
})

module.exports = router