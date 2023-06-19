import { TCache } from "../files"

type TDate = {
    day: number,
    month: number,
    year: number,
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

const hasDateInCache = (date: string, cache: TCache) => {
    return typeof cache[date] !== 'undefined'
}

const hasDatesInCache = (dates: string[], cache: TCache) => {
    return dates.every(date => hasDateInCache(date, cache))
}

export {
    getCurrentDate,
    getTomorrowDate,
    hasDateInCache,
    hasDatesInCache,
    formatDate,
    getDayName,
}
