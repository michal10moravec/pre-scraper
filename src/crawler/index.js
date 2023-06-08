const cookies = require('./cookies')
const login = require('./login')
const today = require('./today')
const tomorrow = require('./tomorrow')

const { PRE_LOGIN_PAGE, BROWSER_EXECUTABLE_PATH } = require('../config')

const { chromium } = require('playwright')

module.exports = async () => {
    const browser = await chromium.launch({ executablePath: BROWSER_EXECUTABLE_PATH });
    const page = await browser.newPage()

    await page.goto(PRE_LOGIN_PAGE)
    await page.setViewportSize({ width: 1920, height: 1080 })

    await cookies(page)
    await login(page)
    const todayTimes = await today(page)
    const tomorrowTimes = await tomorrow(page)

    await browser.close()

    return { todayTimes, tomorrowTimes }
}
