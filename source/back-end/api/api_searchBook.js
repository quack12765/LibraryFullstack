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
            (accession_number, account, reserve_date)
            VALUE
            (?, ?, CURDATE());
        `;

        sql_isCopyResrve = dbFactory.build_mysql_format(sql_isCopyResrve, [req.body.data.accession_number, req.body.data.account]);
        sql_Borrow = dbFactory.build_mysql_format(sql_Borrow, [req.body.data.accession_number, req.body.data.account]);
        
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
    }
}