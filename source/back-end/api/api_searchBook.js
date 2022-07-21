// import moment from 'moment';
// import { transfer_copy } from 'api_location.js'

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
    
    get_copy_reservation_by_accession: function (req, res){
        let sql_checkReserveCount = `
            SELECT * FROM Reserve
            WHERE (accession_number = ?)
        `

        sql_checkReserveCount = dbFactory.build_mysql_format(sql_checkReserveCount, [req.body.data]);

        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_checkReserveCount, statusData, res);
    },

    borrow_copy: function (req, res) {
        let sql_isCopyBorrowed = ' SELECT * FROM Borrow WHERE (accession_number = ?) ';
        let sql_Borrow = ` 
            INSERT INTO Borrow 
            (accession_number, account, borrow_date)
            VALUE
            (?, ?, CURDATE());
        `;

        sql_isCopyBorrowed = dbFactory.build_mysql_format(sql_isCopyBorrowed, [req.body.data.accession_number]);
        sql_Borrow = dbFactory.build_mysql_format(sql_Borrow, [req.body.data.accession_number, req.body.data.account]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.asyncQuery(sql_isCopyBorrowed).then((value) => {
            if (value.length === 0) {
                dbFactory.action_db(sql_Borrow, statusData, res);
            }else{
                res.status(statusData.errorCode).send({ message: statusData.errorMsg })
            }
        });
    },

    reserve_copy: function (req, res) {
        let sql_isCopyResrve = ' SELECT * FROM Reserve WHERE (accession_number = ? AND account = ?) ';
        let sql_Borrow = ` 
            INSERT INTO Reserve 
            (accession_number, account, reserve_date, branch)
            VALUE
            (?, ?, CURDATE(), ?);
        `;

        sql_isCopyResrve = dbFactory.build_mysql_format(sql_isCopyResrve, [req.body.data.accession_number, req.body.data.account]);
        sql_Borrow = dbFactory.build_mysql_format(sql_Borrow, [req.body.data.accession_number, req.body.data.account, req.body.data.branch]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.asyncQuery(sql_isCopyResrve).then((value) => {
            if (value.length === 0) {
                dbFactory.action_db(sql_Borrow, statusData, res);
            }else{
                res.status(statusData.errorCode).send({ message: statusData.errorMsg })
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

    back_copy_by_accession: function (req, res) {
        let sql_BackCopy = `
            DELETE FROM Borrow
            WHERE (accession_number = ?)
        `

        let sql_checkReserve = `
            SELECT * FROM Reserve
            WHERE (accession_number = ?)
        `
        
        sql_BackCopy = dbFactory.build_mysql_format(sql_BackCopy, [req.body.data.accession_number]);
        sql_checkReserve = dbFactory.build_mysql_format(sql_checkReserve, [req.body.data.accession_number]);

        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "沒有書被歸還!"
        };

        // dbFactory.action_db(sql, statusData, res);

        dbFactory.asyncQuery(sql_BackCopy).then((value) => {
            console.log(value)
            if (value.affectedRows !== 0) {
                dbFactory.asyncQuery(sql_checkReserve).then((reserves) => {
                    
                    // no one reserve, change copy's location and set state to zero
                    if(reserves.length === 0){
                        let sql_UpdateCopy = `
                            UPDATE Copy SET 
                            location = ?, state = ?
                            WHERE accession_number = ?
                        `
                        sql_UpdateCopy = dbFactory.build_mysql_format(sql_UpdateCopy, [
                            req.body.data.location,
                            0,
                            req.body.data.accession_number
                        ]);

                        dbFactory.action_db(sql_UpdateCopy, statusData, res);

                        return ;
                    }


                    // Maybe need to Transfer

                    // Finding the index that is reserved earliest 
                    let index = Math.min(reserves.map((e) => {
                        moment.duration(moment(e.reserve_date).diff(moment()))
                    }))

                    reserves = reserves[index]

                    // dont need transfer if they are same brance
                    if(reserves.branch === req.body.data.location){
                        // span()
                        return ;
                    }

                    // transfer the copy
                    let sql = `
                        INSERT INTO transfer 
                        (out_branch, in_branch, date, accession_number)
                        VALUE
                        (?, ?, CURDATE(), ?);
                    `
                    
                    sql = dbFactory.build_mysql_format(sql, [
                        req.body.data.location,
                        reserves.branch, 
                        reserves.accession_number
                    ]);

                    dbFactory.action_db(sql, statusData, res);
                });
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

}