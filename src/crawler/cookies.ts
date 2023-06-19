import { Page } from 'playwright'
import log from '../logger'

export default async (page: Page) => {
    await page.click('#CybotCookiebotDialogBodyButtonDecline')
    log('Clicked on cookie')
}
