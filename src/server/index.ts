import http, { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import { SERVER_HOST, SERVER_PORT } from '../config'
import { read, write } from '../files'
import { getCurrentDate, getTomorrowDate, hasDatesInCache, formatDate, getDayName } from '../time'
import crawler from '../crawler'
import logger from '../logger'
import { getPage, getStyles } from './html'

const handleIndex = async (res: ServerResponse) => {
    try {
        let cache = await read()
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
            cache = await read()
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
    } catch (err: any) {
        logger('Error crawling', err.message, err.stack)
        res.writeHead(500)
        res.end(err.message)
    }
}

const handleFavicon = (res: ServerResponse) => {
    res.writeHead(200, { 'content-type': 'image/x-icon' })
    fs.createReadStream('./favicon.ico').pipe(res)
}

const handleStyles = (res: ServerResponse) => {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.end(getStyles())
}

const handleDefault = (url: string = '', res: ServerResponse) => {
    logger('Url', url, 'not found')
    res.writeHead(404)
    res.end(`Url ${url} not found`)
}

export default () => {
    const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
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
