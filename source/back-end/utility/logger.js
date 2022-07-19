const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')
var path = require('path')
// var appRoot = require('app-root-path')   //!!!在pkg下不能打包!!!

const dotenvAbsolutePath = path.join(__dirname, '../.env')
const dotenv = require('dotenv').config({
    path: dotenvAbsolutePath
})

if (dotenv.error) {
    logger.error({ message: err })
    throw dotenv.error
}

// const env = process.env.NODE_ENV || 'development';
// const logDir = `${appRoot}/logs`   //!!!在pkg下不能打包!!!
const logDir = process.env.LOG_DIR

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    // filename: `${appRoot}/logs/%DATE%.log`,   //!!!在pkg下不能打包!!!
    filename: logDir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    // zippedArchive:true,
    // maxSize:'20m',
    // maxFiles:'14d'
})

const logger = createLogger({
    // change level if in dev environment versus production
    // level: env === 'development' ? 'verbose' : 'info',
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),

    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        dailyRotateFileTransport
    ]
})

module.exports = logger