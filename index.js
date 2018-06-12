const wechat = require('./src/wechat')
const job = require('./src/jobs')
const utils = require('./src/utils')

const main = async () => {
    const user = await wechat.loginToWeChat()
    if (user) {
        console.log(`欢迎欢迎，${user.name()}登入成功！`)
        // 此处改为你需要发消息的群名
        const room = await wechat.queryRoom('咪咕前端闲聊群')
        // 执行时间见jobs.js
        job.scheduleJob(() => {
            const {currentDate, preHour, currentHour} = utils.getDateAndHourRanges()
            room.say(
                `时间：${currentDate}（${preHour}:00-${currentHour}:00）\n结论：H5页面正常`
            )
        })
    }
}

main()
