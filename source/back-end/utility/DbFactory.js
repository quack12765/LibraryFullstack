const mysql = require('mysql')

class DbFactory {
    constructor(host, user, password, database, port, multipleStatements) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.port = port;
        this.multipleStatements = multipleStatements;

        this.mysqlPool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port,
            multipleStatements: multipleStatements
        });

    }

    get pool() {
        return this.mysqlPool;
    }

    action_db(sql, statusData, res) {
        this.mysqlPool.getConnection(function (err, connection) {
            if (err) {
                // not connected!
                res.status(500).send({ message: err })
            }
            ///很常錯誤
            connection.query(sql, function (err, result) {
                // release the connection
                connection.release()

                if (err) {
                    res.status(statusData.errorCode).send({ message: statusData.errorMsg })
                } else {
                    res.status(statusData.successCode).json(result)
                }
            })
        })
    }

    action_db_with_cb(sql, statusData, callback) {
        this.mysqlPool.getConnection(function (err, connection) {
            if (err) {
                // not connected!
                console.log(err)
                res.status(500).sendasyncQuery({ message: err })
            }

            connection.query(sql, function (err, result) {
                // release the connasyncQueryection
                connection.release()

                if (err) {
                    res.status(statusData.errorCode).send({ message: statusData.errorMsg })
                }

                callback(result)
            })
        })
    }

    asyncQuery(sql) {
        return new Promise((resolve, reject) => {
            this.mysqlPool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve((JSON.parse(JSON.stringify(rows))))
                        }

                        connection.release()
                    })
                }
            })
        })
    }

    jsonWrite(res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                code: '1',
                msg: '操作失敗'
            })
        } else {
            res.json(ret)
        }
    }

    build_mysql_format(sql, inserts) {
        return mysql.format(sql, inserts);
    }
}

module.exports.DbFactory = DbFactory
