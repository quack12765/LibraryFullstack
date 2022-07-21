var express = require('express')
var router = express.Router()

var BookSearcher = require('../api/api_searchBook')

// (Table) Books

router.post('/getBookInfoByISBN', function (req, res) {
    BookSearcher.get_book_info_by_ISBN(req, res)
})
  
router.post('/searchBooksByName', function (req, res) {
    BookSearcher.search_books_by_name(req, res)
})

// (Table) Copy

router.post('/getCopyInfoByISBN', function (req, res) {
    BookSearcher.get_copy_info_by_ISBN(req, res)
})
router.post('/getCopyBorrowStateByAccession', function (req, res) {
    BookSearcher.get_copy_borrowState_by_accession(req, res)
})
router.post('/getCopyReservationByAccession', function (req, res) {
    BookSearcher.get_copy_reservation_by_accession(req, res)
})
router.post('/borrowCopy', function (req, res) {
    BookSearcher.borrow_copy(req, res)
})
router.post('/reserveCopy', function (req, res) {
    BookSearcher.reserve_copy(req, res)
})
router.post('/getBorrowingByAccount', function (req, res) {
    BookSearcher.get_borrowing_by_account(req, res)
})
router.post('/getReservingByAccount', function (req, res) {
    BookSearcher.get_reserving_by_account(req, res)
})
router.post('/cancelReserveCopy', function (req, res) {
    BookSearcher.cancel_reserve_copy(req, res)
})


// admin

router.post('/getBorrowing', function (req, res) {
    BookSearcher.get_borrowing(req, res)
})
router.post('/backCopyByAccession', function (req, res) {
    BookSearcher.back_copy_by_accession(req, res)
})
router.post('/getBorrowingByBranch', function (req, res) {
    BookSearcher.get_borrowing_by_branch(req, res)
})



module.exports = router