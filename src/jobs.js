const schedule = require('node-schedule')

const scheduleJob = callback => {
    const rule = new schedule.RecurrenceRule()
    rule.hour = [22, 23, 24, 0, 1, 2, 3, 4, 5, 6]
    rule.second = 0
    const job = schedule.scheduleJob(rule, () => {
        callback(job)
    })
}

exports.scheduleJob = scheduleJob