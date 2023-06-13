const http = require('http')
const fs = require('fs')
const { SERVER_HOST, SERVER_PORT, TIMES_FILE_PATH } = require('../config')
const { read, write } = require('../files')
const {
    getCurrentDate,
    getTomorrowDate,
    hasDatesInCache,
    formatDate,
    getDayName,
} = require('../time')
const crawler = require('../crawler')
const logger = require('../logger')
const { getPage, getStyles } = require('./html')

const handleIndex = async (res) => {
    try {
        let cache = await read(TIMES_FILE_PATH)
        const todayDate = getCurrentDate()
        const tomorrowDate = getTomorrowDate()
        const todayFormatted = formatDate(todayDate)
        const tomorrowFormatted = formatDate(tomorrowDate)
        const todayDayName = getDayName(todayDate)
        const tomorrowDayName = getDayName(tomorrowDate)

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
            cache = await read(TIMES_FILE_PATH)
        }
        const todayCache = cache[todayFormatted]
        const tomorrowCache = cache[tomorrowFormatted]
        const dataLen = Math.max(todayCache.length, tomorrowCache.length)

        logger('Times found in cache, returning')
        res.writeHead(200, {
            'content-type': 'text/html; charset=utf-8',
        })
        res.write(
            getPage(
                [
                    [todayDayName, todayFormatted, ...todayCache],
                    [tomorrowDayName, tomorrowFormatted, ...tomorrowCache],
                ],
                dataLen
            )
        )
        res.end()
    } catch (err) {
        logger('Error crawling', err.message, err.stack)
        res.writeHead(500)
        res.end(err.message)
    }
}

const handleFavicon = (res) => {
    res.writeHead(200, { 'content-type': 'image/x-icon' })
    fs.createReadStream('./favicon.ico').pipe(res)
}

const handleStyles = (res) => {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.end(getStyles())
}

const handleDefault = (url, res) => {
    logger('Url', url, 'not found')
    res.writeHead(404)
    res.end(`Url ${url} not found`)
}

module.exports = () => {
    const requestListener = async (req, res) => {
        switch (req.url) {
            case '/':
                handleIndex(res)
                break
            case '/favicon.ico':
                handleFavicon(res)
                break
            case '/styles.css':
                handleStyles(res)
                break
            default:
                handleDefault(req.url, res)
                break
        }
    }

    const server = http.createServer(requestListener)
    server.listen(SERVER_PORT, SERVER_HOST, () => {
        logger(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`)
    })
}
