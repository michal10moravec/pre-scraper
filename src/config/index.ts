import dotenv from 'dotenv'
dotenv.config()

const PRE_LOGIN_PAGE =
    'https://www.pre.cz/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/'
const PRE_USERNAME = process.env.PRE_USERNAME || ''
const PRE_PASSWORD = process.env.PRE_PASSWORD || ''
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000
const BROWSER_EXECUTABLE_PATH = process.env.BROWSER_EXECUTABLE_PATH || undefined
const TIMES_FILE_PATH = 'times.json'

export {
    PRE_LOGIN_PAGE,
    PRE_USERNAME,
    PRE_PASSWORD,
    SERVER_HOST,
    SERVER_PORT,
    BROWSER_EXECUTABLE_PATH,
    TIMES_FILE_PATH,
}
