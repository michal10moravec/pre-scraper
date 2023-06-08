const http = require('http')
const { SERVER_HOST, SERVER_PORT, TIMES_FILE_PATH } = require('../config')
const { read, write } = require('../files')
const {
    getCurrentDate,
    getTomorrowDate,
    hasDate,
    formatDate,
    getDayName,
} = require('../time')
const crawler = require('../crawler')
const logger = require('../logger')

const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
}

module.exports = () => {
    const requestListener = async (req, res) => {
        try {
            const times = await read(TIMES_FILE_PATH)
            const todayDate = getCurrentDate()
            const tomorrowDate = getTomorrowDate()
            const todayFormatted = formatDate(todayDate)
            const tomorrowFormatted = formatDate(tomorrowDate)
            const todayDayName = getDayName(todayDate).padEnd(7, ' ')
            const tomorrowDayName = getDayName(tomorrowDate).padEnd(7, ' ')

            if (
                hasDate(todayFormatted, times) &&
                hasDate(tomorrowFormatted, times)
            ) {
                logger('Times found in cache, returning')
                res.writeHead(200, headers)
                res.end(
                    `${todayDayName} ${todayFormatted} ${times[todayFormatted]}\n${tomorrowDayName} ${tomorrowFormatted}: ${times[tomorrowFormatted]}`
                )
            } else {
                logger('Times not found in cache, crawling')
                const { todayTimes, tomorrowTimes } = await crawler()
                logger('Crawling finished, saving times to cache')
                await write({
                    ...times,
                    [todayFormatted]: todayTimes,
                    [tomorrowFormatted]: tomorrowTimes,
                })
                logger('Saved new times to cache')
                res.writeHead(200, headers)
                res.end(
                    `${todayDayName} ${todayFormatted} ${todayTimes}\n${tomorrowDayName} ${tomorrowFormatted}: ${tomorrowTimes}`
                )
            }
        } catch (err) {
            logger('Error crawling', err.message, err.stack)
            res.writeHead(500)
            res.end(err.message)
        }
    }

    const server = http.createServer(requestListener)
    server.listen(SERVER_PORT, SERVER_HOST, () => {
        console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`)
    })
}
