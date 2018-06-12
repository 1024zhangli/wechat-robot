const utils = require('../src/utils')

const Logger = require('../src/logger')
const now = new Date(2018, 5,12,0,1,1)

const {currentDate, preHour, currentHour} = utils.getDateAndHourRanges(now)

Logger.debug(`时间：${currentDate}（${preHour}:00-${currentHour}:00）\n结论：H5页面正常`
)


Logger.debug('测试')
Logger.debug('测试2')
Logger.info('哈哈')
Logger.error('错啦。。。')
Logger.warn('错啦。。。')