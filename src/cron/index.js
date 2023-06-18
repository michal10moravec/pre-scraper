const cron = require('node-cron')
const { TIMES_FILE_PATH } = require('../config')
const { read, write } = require('../files')
const {
    getCurrentDate,
    getTomorrowDate,
    hasDatesInCache,
    formatDate,
} = require('../time')
const crawler = require('../crawler')
const logger = require('../logger')

const setupCron = () => {
    cron.schedule('0 3 * * *', async () => {
        logger('Running cron job')
        const cache = await read(TIMES_FILE_PATH)
        const todayDate = getCurrentDate()
        const tomorrowDate = getTomorrowDate()
        const todayFormatted = formatDate(todayDate)
        const tomorrowFormatted = formatDate(tomorrowDate)

        if (!hasDatesInCache([todayFormatted, tomorrowFormatted], cache)) {
            logger('Times not found in cache, crawling')
            const { todayTimes, tomorrowTimes } = await crawler()
            logger('Crawling finished, saving times to cache')
            await write({
                ...cache,
                [todayFormatted]: todayTimes,
                [tomorrowFormatted]: tomorrowTimes,
            })
            logger('Saved new times to cache')
        }
        logger('Cron job ended')
    })
}

module.exports = setupCron
