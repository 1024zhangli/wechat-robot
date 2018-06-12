const Logger = require('./logger')
const puppeteer = require('puppeteer')
const path = require('path')
const utils = require('./utils')

// process.on('message', message => {
//     Logger.debug(`收到父亲消息：指令为：${message.action}`)
//     // 模拟比较耗时的执行
//     start = Date.now() + 5* 1000
//     while(+new Date < start) {}
//     process.send('我收到指令了')
// })

const robotLaunch = (success, error) => {
    puppeteer.launch({
        headless: false
    }).then(async browser => {
        const page = await browser.newPage();
        const {formatDate, sleep} = utils;
        await page.goto('https://pk.migu.cn/pk/page/miguvideo/');
        await page.setViewport({
            width: 375,
            height: 667
        })
        await sleep(1000)

        const entryBtn = await page.$('.footer span[data-action=join]')
        await entryBtn.click()
        await sleep(1000)
        
        const uploadInput = await page.$('#inputUploader')
        await uploadInput.uploadFile(path.resolve(__dirname, '../assets/avatar.jpg'))
        await sleep(1000)

        const uploadBtn = await page.$('.footer span[data-action=upload]')
        await uploadBtn.click()
        await sleep(5000)

        await page.waitForSelector('.footer span[data-action=team]').then(async () => {
            const nextBtn = await page.$('.footer span[data-action=team]')
            await nextBtn.click()
            await sleep(1000)

            const saveBtn = await page.$('.footer span[data-action=save]');
            await saveBtn.click()
            await sleep(2000)

            await page.waitForSelector('.preview-image').then(async () => {
                const imgWrap = await page.$('.preview-image img')
                await imgWrap.click()

                await page.screenshot({ path: 'screenshot.png' })
                console.log(formatDate(new Date().getTime()) + ' 验证通过')
                await browser.close()
                success()
            }, err => {
                err && console.log('程序出错')
                error()
            });
        }, err => {
            err && console.log('程序出错')
            error()
        });
    }, err => {
        err && console.log('程序出错')
        error()
    })
}

module.exports = robotLaunch;