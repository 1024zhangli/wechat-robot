module.exports = {
    isDate(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]'
    },
    formatDate(date, fmt = 'yyyy-MM-dd') {
        if (typeof date == 'number') {
            date = new Date(date)
        }
        const o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        }
        if (/(y{1,4})/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
            )
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1
                        ? o[k]
                        : `00${o[k]}`.substr(`${o[k]}`.length)
                )
            }
        }
        return fmt
    },

    getDateAndHourRanges(now = Date.now()) {
        if (this.isDate(now)) {
            now = +now
        }
        const currentDate = this.formatDate(now - 1 * 60 * 60 * 1000)
        let currentHour = this.formatDate(now, 'hh')
        const preHour = this.formatDate(now - 1 * 60 * 60 * 1000, 'hh')
        if (currentHour === '00' && preHour === '23') {
            currentHour = '24:00'
        }

        return {
            currentDate,
            currentHour,
            preHour
        }
    }
}
