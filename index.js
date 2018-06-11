const wechat = require('./src/wechat')
const job = require('./src/jobs')
const formatDate = (nS, Ft) => {
    Date.prototype.format = function (fmt) {
        var o = {
            'M+': this.getMonth() + 1, // 月份
            'd+': this.getDate(), // 日
            'h+': this.getHours(), // 小时
            'm+': this.getMinutes(), // 分
            's+': this.getSeconds(), // 秒
            'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
            'S': this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
    Ft = Ft || 'yyyy-MM-dd hh:mm:ss';
    return new Date(parseInt(nS)).format(Ft);
}
const main = async () => {
    const user = await wechat.loginToWeChat()
    if (user) {
        console.log(`欢迎欢迎，${user.name()}登入成功！`)
        // 此处改为你需要发消息的群名
        const room = await wechat.queryRoom('咪咕前端闲聊群')
        // 执行时间见jobs.js
        const currentDate = formatDate(new Date().getTime(), 'yyyy-MM-dd');
        const currentHour = formatDate(new Date().getTime(), 'mm');
        const preHour = formatDate(new Date().getTime() - 1 * 60 * 60 * 1000, 'mm');
        job.scheduleJob(() => {
            room.say(`时间：${currentDate}（${preHour}:00-${currentHour}:00）\n结论：H5页面正常`);
        })
    }
}

main()
