var logger = require('./logger')

logger.log('error', 'hello', { message: 'world' });
logger.info('hello', { message: 'world' });
logger.info('connect the server')
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");
let data = 'abcde'
logger.info('The data to send: ', { message: data })
let error = 'no file'
logger.error({ message: error })

var path = require('path')
const logDir1 = path.join(__dirname, '/logger.js')
const logDir2 = path.join(process.cwd(), '../logs')
logger.info('logDir1=', { message: logDir1 })
logger.info('logDir2=', { message: logDir2 })