const wechat = require('./src/wechat')
const job = require('./src/jobs')
const utils = require('./src/utils')
const Logger = require('./src/logger')
const fork = require('child_process').fork;

const main = async () => {
    const user = await wechat.loginToWeChat()
    if (user) {
        Logger.debug(`欢迎欢迎，${user.name()}登入成功！`)
        // 此处改为你需要发消息的群名
        const room = await wechat.queryRoom('咪咕前端闲聊群')
        if(!room) {
            Logger.warn('没有找到房间号，请确认房间号存在')
            return
        }
        // 执行时间见jobs.js
        job.scheduleJob(() => {
            const {currentDate, preHour, currentHour} = utils.getDateAndHourRanges()
            const child = fork('./src/ui-robot.js')
            child.on('message', message  => {
                Logger.debug(`收到来自孩子的消息：${message}`)
                room.say(
                    `时间：${currentDate}（${preHour}:00-${currentHour}:00）\n结论：H5页面正常`
                )
                child.kill(0)
            })
            child.send({action: 'CHECK_PK'})

        })
        // 如果报错就播放音乐
        // utils.playMusic()
    }
}

main()

