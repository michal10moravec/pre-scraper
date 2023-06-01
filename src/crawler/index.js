const cookies = require('./cookies')
const login = require('./login')
const today = require('./today')
const tomorrow = require('./tomorrow')

const { PRE_LOGIN_PAGE, PUPPETEER_BROWSER_EXECUTABLE_PATH } = require('../config')

const puppeteer = require('puppeteer')

module.exports = async () => {
    const browser = await puppeteer.launch({
        product: 'chrome',
        executablePath: PUPPETEER_BROWSER_EXECUTABLE_PATH,
    })
    const page = await browser.newPage()

    await page.goto(PRE_LOGIN_PAGE)
    await page.setViewport({ width: 1920, height: 1080 })

    await cookies(page)
    await login(page)
    const todayTimes = await today(page)
    const tomorrowTimes = await tomorrow(page)

    await browser.close()

    return { todayTimes, tomorrowTimes }
}
