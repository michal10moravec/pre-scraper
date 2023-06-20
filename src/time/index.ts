import { TCache } from '../files'
import logger from '../logger'

type TDate = {
    day: number
    month: number
    year: number
    dayName: string
}

const formatDate = (date: TDate) => `${date.day}.${date.month}.${date.year}`
const getDayName = (date: TDate) => `${date.dayName}`

const getDate = (unixTime: number) => {
    let date_ob = new Date(unixTime)
    const day = date_ob.getDate()
    const month = date_ob.getMonth() + 1
    const year = date_ob.getFullYear()
    const dayName = date_ob.toLocaleDateString('cs-CZ', { weekday: 'long' })

    return { day, month, year, dayName }
}

const getCurrentDate = () => {
    const today = Date.now()
    return getDate(today)
}

const getTomorrowDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return getDate(tomorrow.getTime())
}

const parseDateFromCache = (inputDate: string) => {
    const [day, month, year] = inputDate.split('.')
    const outputDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        0,
        0,
        0
    )
    return outputDate
}

const getCustomDate = (date: Date) => {
    const day = new Date(date)
    return getDate(day.getTime())
}

const hasDateInCache = (date: string, cache: TCache) => {
    return typeof cache[date] !== 'undefined'
}

const hasDatesInCache = (dates: string[], cache: TCache) => {
    return dates.every((date) => hasDateInCache(date, cache))
}

export {
    getCurrentDate,
    getTomorrowDate,
    parseDateFromCache,
    getCustomDate,
    hasDateInCache,
    hasDatesInCache,
    formatDate,
    getDayName,
}
