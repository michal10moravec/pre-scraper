const http = require('http')
const { SERVER_HOST, SERVER_PORT, TIMES_FILE_PATH } = require('../config')
const { read, write } = require('../files')
const {
    getCurrentDate,
    getTomorrowDate,
    hasDate,
    formatDate,
} = require('../time')
const crawler = require('../crawler')
const logger = require('../logger')

module.exports = () => {
    const requestListener = async (req, res) => {
        try {
            const times = await read(TIMES_FILE_PATH)
            const todayDate = formatDate(getCurrentDate())
            const tomorrowDate = formatDate(getTomorrowDate())

            if (hasDate(todayDate, times) && hasDate(tomorrowDate, times)) {
                logger('Times found in cache, returning')
                res.writeHead(200)
                res.end(
                    `${todayDate}: ${times[todayDate]}\n${tomorrowDate}: ${times[tomorrowDate]}`
                )
            } else {
                logger('Times not found in cache, crawling')
                const { todayTimes, tomorrowTimes } = await crawler()
                logger('Crawling finished, saving times to cache')
                await write({
                    ...times,
                    [todayDate]: todayTimes,
                    [tomorrowDate]: tomorrowTimes,
                })
                logger('Saved new times to cache')
                res.writeHead(200)
                res.end(
                    `${todayDate}: ${todayTimes}\n${tomorrowDate}: ${tomorrowTimes}`
                )
            }
        } catch (err) {
            res.writeHead(500)
            res.end(err.message)
        }
    }

    const server = http.createServer(requestListener)
    server.listen(SERVER_PORT, SERVER_HOST, () => {
        console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`)
    })
}
