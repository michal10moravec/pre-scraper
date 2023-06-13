const formatDate = (date) => `${date.day}.${date.month}.${date.year}`
const getDayName = (date) => `${date.dayName}`

const getDate = (unixTime) => {
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
    return getDate(tomorrow)
}

const hasDateInCache = (date, cache) => {
    return typeof cache[date] !== 'undefined'
}

const hasDatesInCache = (dates, cache) => {
    return dates.every(date => hasDateInCache(date, cache))
}

module.exports = {
    getCurrentDate,
    getTomorrowDate,
    hasDateInCache,
    hasDatesInCache,
    formatDate,
    getDayName,
}
