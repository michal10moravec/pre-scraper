const { PRE_USERNAME, PRE_PASSWORD } = require('../config')
const log = require('../logger')

module.exports = async (page) => {
    await page.type('#login_name', PRE_USERNAME)
    await page.type('#login_password', PRE_PASSWORD)
    log('Filled in credentials')

    await page.click(
        '#pre_loginForm_subPage > div:nth-child(5) > div.t-cell.w270px > a'
    )
    log('Clicked on login button')
}
