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
    get_all_comments_by_ISBN: function (req, res) {
        let sql_getComment = ` 
            SELECT * FROM Comment
            WHERE (comment_ISBN = ? AND comment_account <> ?)
        `;
        
        sql_getComment = dbFactory.build_mysql_format(sql_getComment, [
            req.body.data.ISBN,
            req.body.data.account
        ]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_getComment, statusData, res);
    },

    add_comment_by_account: function (req, res) {
        let sql_AddComment = ` 
            INSERT INTO Comment
            (comment_account, comment_ISBN, score, comment)
            VALUE
            (?, ?, ?, ?) 
        `;
        
        sql_AddComment = dbFactory.build_mysql_format(sql_AddComment, [
            req.body.data.account, req.body.data.ISBN, req.body.data.score, req.body.data.comment
        ]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_AddComment, statusData, res);
    },

    del_comment_by_account: function (req, res) {
        let sql_getComment = ` 
            DELETE FROM Comment
            WHERE (comment_ISBN = ? AND comment_account = ?)
        `;
        
        sql_getComment = dbFactory.build_mysql_format(sql_getComment, [
            req.body.data.ISBN,
            req.body.data.account
        ]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_getComment, statusData, res);
    },

    get_personal_comment: function (req, res) {
        let sql_getComment = ` 
            SELECT * FROM Comment
            WHERE (comment_isbn = ? AND comment_account = ?)
        `;
        
        sql_getComment = dbFactory.build_mysql_format(sql_getComment, [
            req.body.data.ISBN, req.body.data.account
        ]);
        
        let statusData = {
            successCode: 200,
            errorCode: 500,
            errorMsg: "Some error occurred while inserting the account."
        };

        dbFactory.action_db(sql_getComment, statusData, res);
    }
}