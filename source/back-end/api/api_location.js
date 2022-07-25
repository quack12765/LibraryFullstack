var path = require('path');
var db = require('../utility/DbFactory');
var searchBook = require('./api_searchBook')

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
    get_city_list: function (req, res) {

        let sql = ' SELECT * FROM City ';
        
        // sql = dbFactory.build_mysql_format(sql, [req.body.data]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql, statusData, res);
    },

    get_region_list: function (req, res) {
        let sql = `
            SELECT * FROM Region 
            WHERE (city_name = ?)
        `;
        
        sql = dbFactory.build_mysql_format(sql, [req.body.data.city]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql, statusData, res);
    },

    get_branch_list: function (req, res) {
        let sql = `
            SELECT * FROM branch 
        `;
        
        // sql = dbFactory.build_mysql_format(sql, [req.body.data.city]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql, statusData, res);
    },

    // admin

    transfer_copy: function (req, res) {

        console.log("Transfer()")

        // First, set Copy state to 1 ( Transfer )
        console.log(searchBook)
        
        let sql_UpdateCopyTo1 = `
            UPDATE Copy SET State = 1
            WHERE ( accession_number = ? )
        `
        sql_UpdateCopyTo1 = dbFactory.build_mysql_format(sql_UpdateCopyTo1, [
            req.body.data.accession_number
        ]);

        dbFactory.asyncQuery(sql_UpdateCopyTo1).then(() => {

            // Then, Transfer it 

            let sql_TransferCopy = `
                INSERT INTO transfer 
                (out_branch, in_branch, date, accession_number)
                VALUE
                (?, ?, CURDATE(), ?);
            `

            sql_TransferCopy = dbFactory.build_mysql_format(sql_TransferCopy, [
                req.body.data.out_branch,
                req.body.data.in_branch, 
                req.body.data.accession_number
            ]);

            let statusData = {
                successCode: 200,
                errorCode: 500,
                errorMsg: "Some error occurred while inserting the account."
            };

            dbFactory.action_db(sql_TransferCopy, statusData, res);
        })
    },

    get_in_transfer_by_branch: function (req, res) {
        let sql = `
            SELECT * FROM Transfer
            LEFT JOIN Copy ON (Transfer.accession_number = Copy.accession_number)
            LEFT JOIN Books ON Copy.ISBN = Books.ISBN
            WHERE (in_branch = ?)
        `
        
        sql = dbFactory.build_mysql_format(sql, [req.body.data.branch]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: ""
        };

        dbFactory.action_db(sql, statusData, res);
    },

    get_out_transfer_by_branch: function (req, res) {
        let sql = `
            SELECT * FROM Transfer
            LEFT JOIN Copy ON (Transfer.accession_number = Copy.accession_number)
            LEFT JOIN Books ON Copy.ISBN = Books.ISBN
            WHERE (out_branch = ?)
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