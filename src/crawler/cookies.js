const log = require('../logger')

module.exports = async (page) => {
    await page.click('#CybotCookiebotDialogBodyButtonDecline')
    log('Clicked on cookie')
}
