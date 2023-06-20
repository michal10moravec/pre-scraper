import cron from 'node-cron'
import { read, write } from '../files'
import {
    getCurrentDate,
    getTomorrowDate,
    hasDatesInCache,
    formatDate,
} from '../time'
import crawler from '../crawler'
import logger from '../logger'

export default () => {
    cron.schedule('0 3 * * *', async () => {
        logger('Running cron job')
        const cache = await read()
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
