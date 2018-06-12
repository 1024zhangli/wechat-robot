const wechat = require('./src/wechat')
const job = require('./src/jobs')
const utils = require('./src/utils')

const main = async () => {
    const user = await wechat.loginToWeChat()
    if (user) {
        console.log(`欢迎欢迎，${user.name()}登入成功！`)
        // 此处改为你需要发消息的群名
        const room = await wechat.queryRoom('巴啦啦测试群')
        if(!room) {
            console.log('没有找到房间号，请确认房间号存在')
            return
        }
        // 执行时间见jobs.js
        job.scheduleJob(() => {
            const {currentDate, preHour, currentHour} = utils.getDateAndHourRanges()
            room.say(
                `时间：${currentDate}（${preHour}:00-${currentHour}:00）\n结论：H5页面正常`
            )
        })

        // 如果报错就播放音乐
        // utils.playMusic()
    }
}

main()

