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
    }
}