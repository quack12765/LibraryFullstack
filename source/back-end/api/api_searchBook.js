var moment = require('moment');
var location = require('./api_location')

var path = require('path');
var db = require('../utility/DbFactory');

const dotenvAbsolutePath = path.join(__dirname, '../.env');
const dotenv = require('dotenv').config({ path: dotenvAbsolutePath });

if (dotenv.error) {
    throw dotenv.error;
};

let dbFactory = new db.DbFactory(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME,
    process.env.DB_PORT,
    true
);

module.exports = {
    get_book_info_by_ISBN: function (req, res) {

        let sql = ' SELECT * FROM Books WHERE (ISBN = ?) ';
        
        sql = dbFactory.build_mysql_format(sql, [req.body.data]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql, statusData, res);
    },
    search_books_by_name: function (req, res) {
        let sql = " SELECT * FROM Books WHERE name LIKE '%" + req.body.data +"%' ";
    
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql, statusData, res);
    },

    // (Table) Copy

    get_copy_info_by_ISBN: function (req, res) {
        let sql_Info = 
        ` 
            SELECT Borrow.*, Copy.* 
            FROM Copy LEFT JOIN Borrow ON Copy.accession_number = Borrow.accession_number
            WHERE (ISBN = ?) 
        `;
        
        sql_Info = dbFactory.build_mysql_format(sql_Info, [req.body.data]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_Info, statusData, res);
    },

    get_copy_reservation_by_accession: function (req, res){
        let sql_Info = 
        ` 
            SELECT * FROM Reserve
            WHERE (accession_number = ?) 
        `;
        
        sql_Info = dbFactory.build_mysql_format(sql_Info, [req.body.data]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_Info, statusData, res);
    },

    get_copy_borrowState_by_accession: function (req, res) {
        let sql_Info = 
        ` 
            SELECT * FROM Borrow
            WHERE (accession_number = ?) 
        `;
        
        sql_Info = dbFactory.build_mysql_format(sql_Info, [req.body.data]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_Info, statusData, res);
    },

    borrow_copy: function (req, res) {

        let sql_isCopyBorrowed = ' SELECT * FROM Borrow WHERE (accession_number = ?) ';
        let sql_Borrow = ` 
            INSERT INTO Borrow 
            (accession_number, account, borrow_date, branch)
            VALUE
            (?, ?, CURDATE(), ?);
        `;
        let sql_UpdateCopyTo3 = this.Query_UpdateCopyStateTo3(req.body.data.accession_number)

        sql_isCopyBorrowed = dbFactory.build_mysql_format(sql_isCopyBorrowed, [req.body.data.accession_number]);
        sql_Borrow = dbFactory.build_mysql_format(sql_Borrow, [
            req.body.data.accession_number, 
            req.body.data.account,
            req.body.data.location
        ]);

        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.asyncQuery(sql_UpdateCopyTo3).then(() => {
            dbFactory.asyncQuery(sql_isCopyBorrowed).then((value) => {
                if (value.length === 0) {
                    dbFactory.action_db(sql_Borrow, statusData, res);
                }else{
                    res.status(statusData.errorCode).send({ message: statusData.errorMsg })
                }
            });
        })
    },

    // please pass copy info containing reservation
    reserve_copy: function (req, res) {
        let sql_copy = this.Query_GetCopy(req.body.data.accession_number)
        let sql_Reserve = ` 
            INSERT INTO Reserve 
            (accession_number, account, reserve_date, branch)
            VALUE
            (?, ?, CURDATE(), ?);
        `;

        sql_Reserve = dbFactory.build_mysql_format(sql_Reserve, [
            req.body.data.accession_number, 
            req.body.data.account, 
            req.body.data.to_location
        ]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.asyncQuery(sql_copy).then((c) => {
            c = c[0]

            // 在架上 ?
            if (c.state === 0) {
                
                if (req.body.data.cur_location === req.body.data.to_location){
                    dbFactory.action_db(this.Query_UpdateCopyStateTo2(req.body.data.accession_number, req.body.data.cur_location), statusData, res);
                }else{

                    dbFactory.asyncQuery(sql_Reserve).then(() => {
                    
                        req.body.data = {
                            out_branch: req.body.data.cur_location,
                            in_branch: req.body.data.to_location, 
                            accession_number: req.body.data.accession_number
                        }

                        location.transfer_copy(req, res)
                    })
                }
            
            }else{
                dbFactory.action_db(sql_Reserve, statusData, res);
            }
        });
    },

    get_borrowing_by_account: function (req, res){
        let sql_getBorrowing = `
            SELECT * FROM Borrow
            RIGHT JOIN Copy ON Borrow.accession_number = Copy.accession_number
            RIGHT JOIN Books ON Copy.ISBN = Books.ISBN
            WHERE (account = ?)
        `
        
        sql_getBorrowing = dbFactory.build_mysql_format(sql_getBorrowing, [req.body.data.account]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_getBorrowing, statusData, res);
    },

    get_reserving_by_account: function (req, res){
        let sql_getReserving = `
            SELECT * FROM Reserve
            RIGHT JOIN Copy ON Reserve.accession_number = Copy.accession_number
            RIGHT JOIN Books ON Copy.ISBN = Books.ISBN
            WHERE (account = ?)
        `
        
        sql_getReserving = dbFactory.build_mysql_format(sql_getReserving, [req.body.data.account]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_getReserving, statusData, res);
    },

    cancel_reserve_copy: function (req, res) {
        let sql_cancelReserve = `
            DELETE FROM Reserve
            WHERE (account = ? AND accession_number = ?)
        `
        
        sql_cancelReserve = dbFactory.build_mysql_format(sql_cancelReserve, [req.body.data.account, req.body.data.accession_number]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_cancelReserve, statusData, res);
    },




    // admin

    get_borrowing: function (req, res) {
        let sql_getBorrowing = `
            SELECT * FROM Borrow
            LEFT JOIN Copy ON (Borrow.accession_number = Copy.accession_number)
            LEFT JOIN Books ON Copy.ISBN = Books.ISBN
        `
        
        // sql_getBorrowing = dbFactory.build_mysql_format(sql_getBorrowing, [req.body.data.account]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_getBorrowing, statusData, res);
    },

    // please pass full copy data
    back_copy_by_accession: function (req, res) {
        let sql_BackCopy = `
            DELETE FROM Borrow
            WHERE (accession_number = ?)
        `
        
        sql_BackCopy = dbFactory.build_mysql_format(sql_BackCopy, [req.body.data.accession_number]);

        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "沒有書被歸還!"
        };

        // 1. delete borrow
        dbFactory.asyncQuery(sql_BackCopy).then((value) => {
            if (value.affectedRows !== 0) {

                // copy arrival
                this.span(req, res)

            }else{
                res.status(statusData.errorCode).send({ message: statusData.errorMsg })
            }
        });
    },

    get_borrowing_by_branch: function (req, res) {
        let sql = `
            SELECT * FROM Borrow
            LEFT JOIN Copy ON (Borrow.accession_number = Copy.accession_number)
            LEFT JOIN Books ON Copy.ISBN = Books.ISBN
            WHERE (branch = ?)
        `
        
        sql = dbFactory.build_mysql_format(sql, [req.body.data.branch]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: ""
        };

        dbFactory.action_db(sql, statusData, res);
    },

    // please pass copy info and branch
    span: function (req, res) {

        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        let sql_span = `
            UPDATE Copy SET span_date = CURDATE(), cur_location = ?
            WHERE ( accession_number = ? )
        `

        let sql_DelTransfer = `
            DELETE FROM Transfer
            WHERE ( accession_number = ? )
        `

        let sql_checkReserve    = this.Query_getCopyReservationByAccession(req.body.data.accession_number)
            sql_span            = dbFactory.build_mysql_format(sql_span, [req.body.data.location, req.body.data.accession_number]);
            sql_DelTransfer     = dbFactory.build_mysql_format(sql_DelTransfer, [req.body.data.accession_number]);

        dbFactory.asyncQuery(sql_DelTransfer).then((d) => {
            console.log(d)
            dbFactory.asyncQuery(sql_span).then(() => {
                // 1. chack reservation
                dbFactory.asyncQuery(sql_checkReserve).then((reserves) => {

                    // no reservation
                    if(reserves.length === 0){

                        // Transfer or not
                        if (req.body.data.location !== req.body.data.cur_location) {

                            req.body.data = {
                                out_branch:         req.body.data.cur_location,
                                in_branch:          req.body.data.location, 
                                accession_number:   req.body.data.accession_number
                            }

                            location.transfer_copy(req, res)
                            
                        } else {
                            dbFactory.action_db(this.Query_UpdateCopyStateTo0(req.body.data.accession_number), statusData, res);
                        }

                        return ;
                    }


                    // Finding the index that is reserved earliest 
                    let index = Math.min(reserves.map((e) => {
                        moment.duration(moment(e.reserve_date).diff(moment()))
                    }))

                    reserves = reserves[index]

                    console.log("最近預約：", reserves)


                    // is same branch ?

                    console.log(reserves.branch, req.body.data.location)

                    if(reserves.branch === req.body.data.location){

                        // 通知取書
                        let sql_state2 = this.Query_UpdateCopyStateTo2(req.body.data.accession_number, req.body.data.location)
                        dbFactory.action_db(sql_state2, statusData, res);

                        return ;
                    }

                        
                    // transfer the copy
                
                    req.body.data = {
                        out_branch :        req.body.data.location,
                        in_branch :         reserves.branch,
                        accession_number :  reserves.accession_number
                    }

                    location.transfer_copy(req, res)

                });
            })
        })
    },
    
    get_all_copy_by_branch: function (req, res) {
        let sql = `
            SELECT * FROM Copy
            LEFT JOIN Books ON Copy.ISBN = Books.ISBN
            WHERE (location = ?)
        `
        
        sql = dbFactory.build_mysql_format(sql, [req.body.data.location]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql, statusData, res);
    },




    // back-end api

    // Checking borrow date
    CheckBorrowDate: function () {
        let sql = `
            SELECT * FROM Borrow
            WHERE ( DATEDIFF(borrow_date, CURDATE()) > 20 )
        `
        dbFactory.asyncQuery(sql).then((value) => {
            // 處理到期
            console.log(value)
        })

        console.log('CheckBorrowDate Schdule is done.');
    },

    Query_UpdateCopyStateTo0: function (acc) {
        let sql = `
            UPDATE Copy SET State = 0, cur_location = location 
            WHERE ( accession_number = ? )
        `

        return dbFactory.build_mysql_format(sql, [
            acc
        ]);
    },

    Query_UpdateCopyStateTo1: function (acc) {
        let sql = `
            UPDATE Copy SET State = 1
            WHERE ( accession_number = ? )
        `

        return dbFactory.build_mysql_format(sql, [
            acc
        ]);
    },

    Query_UpdateCopyStateTo2: function (acc, loc) {
        console.log(loc)
        let sql = `
            UPDATE Copy SET State = 2, cur_location = ? 
            WHERE ( accession_number = ? )
        `

        return dbFactory.build_mysql_format(sql, [
            loc, acc
        ]);
    },

    Query_UpdateCopyStateTo3: function (acc) {
        let sql = `
            UPDATE Copy SET State = 3
            WHERE ( accession_number = ? )
        `

        return dbFactory.build_mysql_format(sql, [
            acc
        ]);
    },

    Query_GetCopy: function (acc) {
        let sql = `
            SELECT state FROM Copy
            WHERE ( accession_number = ? )
        `

        return dbFactory.build_mysql_format(sql, [
            acc
        ]);
    },

    Query_getCopyReservationByAccession: function (acc){
        let sql_checkReserveCount = `
            SELECT * FROM Reserve
            WHERE (accession_number = ?)
        `

        return dbFactory.build_mysql_format(sql_checkReserveCount, [
            acc
        ]);
    },

    // return a array, length = 0 (false)
    Query_CheckIsSameBranch(acc) {
        let sql_checkReserveCount = `
            SELECT * FROM Copy
            WHERE (accession_number = ? AND location = cur_location)
        `

        return dbFactory.build_mysql_format(sql_checkReserveCount, [
            acc
        ]);
    },
}