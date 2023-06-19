import { Page } from 'playwright'
import log from '../logger'

export default async (page: Page) => {
    await page.click('#component-tab-hdo-zitra > a')
    log('Clicked on tomorrow')
    await page.waitForSelector('#component-hdo-zitra > div.hdo-bar')
    log('Waited for tomorrow times to load')

    const tomorrowOnOffTimes = await page.evaluate(() => {
        const tds = Array.from(
            document.querySelectorAll('#component-hdo-zitra > div.hdo-bar span')
        ) as HTMLElement[]
        return tds.map((td) => td.title).filter((title) => title !== '')
    })
    if (tomorrowOnOffTimes[1] && tomorrowOnOffTimes[3]) {
        return [tomorrowOnOffTimes[1], tomorrowOnOffTimes[3]]
    }

    throw new Error('Error fetching tomorrow times')
}
