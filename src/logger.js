const path = require('path')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const logFolder = path.join(__dirname, '../logs')

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`
})
const logger = createLogger({
    exitOnError: false,
    level: 'debug',
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.File({
            filename: path.join(logFolder, 'combine.log')
        }),
        new transports.File({
            filename: path.join(logFolder, 'errors.log'),
            level: 'error'
        }),
        new transports.Console()
    ],
    exceptionHandlers: [
        new transports.File({
            filename: path.join(logFolder, 'exceptions.log')
        })
    ]
})

module.exports = logger
