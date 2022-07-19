var request = require('supertest');
var should  = require('should');
var fs      = require('fs');
var mysql   = require('mysql')

// class file
var db = require('../utility/DbFactory');
const { resolve } = require('app-root-path');

describe('Test for account api', function () {
    let server;
    let schemaName = 'Example_test';
    let sqlConnection = mysql.createConnection({
        host: "localhost",
        user: "b85c",
        port: 3306,
        password: "Expansion@b85c"
    });
    let database = new db.DbFactory(
        'localhost',
        'b85c',
        'Expansion@b85c',
        'Example_test',
        3306,
        true
    );

    before(() => {
        console.log('Initialing database....')
        return new Promise((resolve) => {
            let sql = fs.readFileSync('Example.sql').toString()
            create_schema(schemaName, sqlConnection)
                .then(() => {
                    database.action_db_with_cb(sql,200, res=>{
                        console.log('Initial complete!')
                        resolve()
                    })
                })
                .catch(() => {
                    console.log('Unit testing stopped due to "Create Schema Error", Please check your sql statement.')
                })
        })
    })

    after(() => {
        console.log('Clearing database...')
        return new Promise((resolve) => {
            drop_schema(schemaName, sqlConnection)
                .then(() => {
                    console.log('All test data had been removed!')
                    resolve()
                })
                .catch(() => {
                    console.log('Unit testing stopped due to "Create Schema Error", Please check your sql statement.')
                })
        })
    })
    beforeEach(() => {
        server = require('../server');
    });

    afterEach(() => {
        server.close();
    })

    function drop_schema(name, sqlConnection) {
        return new Promise((resolve, reject) => {
            sqlConnection.connect(err => {
                sqlConnection.query(`DROP SCHEMA IF EXISTS ${name}`,() => {
                    resolve(`Drop schema ${name} success!`)
                })
            })
        })
    }

    function create_schema(name, sqlConnection) {
        return new Promise((resolve, reject) => {
            sqlConnection.connect(err => {
                sqlConnection.query(`CREATE SCHEMA IF NOT EXISTS ${name}`,() => {
                    resolve(`Create schema ${name} success!`)
                })
            })
        })
    }

    function is_object(obj) {
        return typeof obj === 'object' && !!obj;
    };

    function diff(a, b) {
        if (!is_object(a) || !is_object(b)) {
            throw new TypeError(' a or b is invalid json');
        }

        let keys = Object.keys(a);

        if (keys.length == 0) {
            return JSON.stringify(a) === JSON.stringify(b);
        }

        let aValue, bValue, key;

        for (key of keys) {
            aValue = a[key];
            bValue = b[key];

            if (is_object(aValue) && is_object(bValue)) {
                return diff(aValue, bValue);
            } else if (aValue !== bValue) {
                return false;
            }
        }

        return true;
    };

    it('Order: /api/accounts/login', function (done) {
        let data = {
            account: 'admin',
            password: 'admin'
        }

        let goldenValues = [
            {
                account: 'admin',
                password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
                name: 'admin',
                job_number: '1900160',
                dept: '',
                role: 'admin'
            }
        ]

        request(server)
            .post('/api/accounts/login')
            .send({ data : data })
            .expect(200)
            .end((err, res) => {
                diff(res.body, goldenValues).should.equal(true)
                return done()
            })
    });

    it('Order: /api/accounts/select_accounts', function (done) {
        let goldenValues = [
            {
                account: 'admin',
                password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
                name: 'admin',
                job_number: '1900160',
                dept: '',
                role: 'admin'
              },
              {
                account: 'user',
                password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
                name: 'user',
                job_number: '1900158',
                dept: '',
                role: 'user'
              }
        ]

        request(server)
            .get('/api/accounts/select_accounts')
            .expect(200)
            .end((err, res) => {
                diff(res.body, goldenValues).should.equal(true)
                return done()
            })
    });

    it('Order: /api/accounts/insert_accounts', function (done) {
        let data = {
            account: 'unit_test',
            password: 'unit_test',
            name: 'unit_test',
            job_number: 'unit_test',
            dept: 'unit_test',
            role: 'admin'
        }

        request(server)
            .post('/api/accounts/insert_accounts')
            .send({ data : data })
            .expect(201,done())
    });

    it('Order: /api/accounts/update_accounts', function (done) {
        let data = {
            account: 'unit_test',
            name: 'unit_test_update',
            job_number: 'unit_test_update',
            dept: 'unit_test_update',
            role: 'guest'
        }

        request(server)
            .post('/api/accounts/update_accounts')
            .send({ data : data })
            .expect(202,done())
    });

    it('Order: /api/accounts/update_password', function (done) {
        let data = {
            account: 'unit_test',
            password: 'unit_test_update',
        }

        request(server)
            .get('/api/accounts/update_password')
            .send({ data : data })
            .expect(202,done())
    });

    it('Order: /api/accounts/delete_accounts', function (done) {
        let data = {
            account: 'unit_test'
        }

        request(server)
            .get('/api/accounts/delete_accounts')
            .send({ data : data })
            .expect(203,done())
    });

});
