const log = require('../logger')

module.exports = async (page) => {
    await page.waitForSelector('#component-hdo-dnes > div.hdo-bar span')
    log('Waited for today times to load')

    const todayOnOffTimes = await page.evaluate(() => {
        const tds = Array.from(
            document.querySelectorAll('#component-hdo-dnes > div.hdo-bar span')
        )
        return tds.map((td) => td.title).filter((title) => title !== '')
    })
    if (todayOnOffTimes[1] && todayOnOffTimes[3]) {
        return [todayOnOffTimes[1], todayOnOffTimes[3]]
    }

    throw new Error('Error fetching today times')
}
