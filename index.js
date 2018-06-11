const wechat = require('./src/wechat')
const job = require('./src/jobs')

const main = async () => {
    const user = await wechat.loginToWeChat()
    if (user) {
        console.log(`欢迎欢迎，${user.name()}登入成功！`)
        // 次数改为你需要发消息的群名
        const room = await wechat.queryRoom('巴啦啦测试群')
        // 22:00 - 06:00的每个小时的整点会执行
        job.scheduleJob(() => {
            room.say(`现在时间是${new Date().toLocaleString()}\n我很想你`)
        })
    }
}

main()
