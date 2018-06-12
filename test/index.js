const utils = require('../src/utils')

const now = new Date(2018, 5,12,0,1,1)

const {currentDate, preHour, currentHour} = utils.getDateAndHourRanges(now)

console.log(
    `时间：${currentDate}（${preHour}:00-${currentHour}:00）\n结论：H5页面正常`
)
