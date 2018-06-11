const { Wechaty, Room } = require('wechaty')
const PromiseResolve = require('./promiseResolve')
const bot = Wechaty.instance({ profile: 'my-bot' })
const promiseResolve = new PromiseResolve()

module.exports = {

    /**
     * 登入到微信
     * @returns {Promise<Void>}
     */
    loginToWeChat() {
        bot.on('scan', (url, code) => {
            console.log(`[${code}] Scan ${url} to login.`)
        })
        
        bot.on('login', user => {
            promiseResolve.resolve(user)
        })
        
        bot.on('message',async message => {
            const room = message.room()
            const sender = message.from()
            if (!sender || !room) return
            const content = message.content()
            console.log(`${sender.name()}<${room.topic()}>:`, content)
            if(/自动回复一下下/.test(content)) {
                const myRoom = await Room.find({topic: room.topic()})
                myRoom.say('我自动回复你拉', sender)
            }
        })

        bot.start()

        return promiseResolve.promise
    },

    /**
     * 查找指定的群
     * @returns {Promise<Room>}
     */
    queryRoom(topic = '巴拉拉测试群') {
        return Room.find({topic})
    },

    self() {
        return bot.self()
    },

    isLogin() {
        try {
            const user = this.self()
            return !!user && !!user.name()
        } catch (error) {
            return false
        }
    }
}
