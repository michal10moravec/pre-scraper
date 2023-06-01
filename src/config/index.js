require('dotenv').config()

module.exports = {
    PRE_LOGIN_PAGE:
        'https://www.pre.cz/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/',
    PRE_USERNAME: process.env.PRE_USERNAME,
    PRE_PASSWORD: process.env.PRE_PASSWORD,
    SERVER_HOST: process.env.SERVER_HOST || 'localhost',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    PUPPETEER_BROWSER_EXECUTABLE_PATH: process.env.PUPPETEER_BROWSER_EXECUTABLE_PATH || false,
    TIMES_FILE_PATH: 'times.json'
}
