import { Page } from 'playwright'
import log from '../logger'

export default async (page: Page) => {
    await page.waitForSelector('#component-hdo-dnes > div.hdo-bar span')
    log('Waited for today times to load')

    const todayOnOffTimes = await page.evaluate(() => {
        const tds = Array.from(
            document.querySelectorAll('#component-hdo-dnes > div.hdo-bar span')
        ) as HTMLElement[]
        return tds.map((td) => td.title).filter((title) => title !== '')
    })
    if (todayOnOffTimes[1] && todayOnOffTimes[3]) {
        return [todayOnOffTimes[1], todayOnOffTimes[3]]
    }

    throw new Error('Error fetching today times')
}
