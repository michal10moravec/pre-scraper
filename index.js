const { init } = require('./src/files')
const server = require('./src/server')
const { chromium } = require('playwright')

const index = async () => {
    // await init({})
    // server()
    console.log('Launching chromium')
    const browser = await chromium.launch();
    console.log('Chromium launched')
    const page = await browser.newPage();
    console.log('Page created')
    await page.goto('https://www.google.com');
    console.log('Visited google')
    await browser.close()
    console.log('Closed browser')
}

index()
