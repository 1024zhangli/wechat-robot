const Logger = require('./logger')
process.on('message', message => {
    Logger.debug(`收到父亲消息：指令为：${message.action}`)
    // 模拟比较耗时的执行
    start = Date.now() + 5* 1000
    while(+new Date < start) {}
    process.send('我收到指令了')
})