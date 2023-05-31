const puppeteer = require('puppeteer');
require('dotenv').config();

const PRE_LOGIN_PAGE = 'https://www.pre.cz/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/'
const PRE_USERNAME = process.env.PRE_USERNAME
const PRE_PASSWORD = process.env.PRE_PASSWORD

const index = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(PRE_LOGIN_PAGE);
    await page.setViewport({ width: 1920, height: 1080 });

    await page.click('#CybotCookiebotDialogBodyButtonDecline')
    console.log('Clicked on cookie')

    await page.type('#login_name', PRE_USERNAME);
    await page.type('#login_password', PRE_PASSWORD);
    console.log('Filled in credentials')

    await page.click('#pre_loginForm_subPage > div:nth-child(5) > div.t-cell.w270px > a')
    console.log('Clicked on login button')

    await page.waitForSelector('#component-hdo-dnes > div.hdo-bar span')
    console.log('Waited for times to load')

    const todayOnOffTimes = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#component-hdo-dnes > div.hdo-bar span'))
        return tds.map(td => td.title).filter(title => title !== '')
    });
    const todayOnTimes = [todayOnOffTimes[1], todayOnOffTimes[3]]
    console.log(todayOnTimes)

    await page.click('#component-tab-hdo-zitra > a')
    console.log('Clicked on tomorrow')
    await page.waitForSelector('#component-hdo-zitra > div.hdo-bar')
    console.log('Waited for tomorrow times to load')
    
    const tomorrowOnOffTimes = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#component-hdo-zitra > div.hdo-bar span'))
        return tds.map(td => td.title).filter(title => title !== '')
    });
    const tomorrowOnTimes = [tomorrowOnOffTimes[1], tomorrowOnOffTimes[3]]
    console.log(tomorrowOnTimes)

    await browser.close();
}

index()