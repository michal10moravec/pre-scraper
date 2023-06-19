import setupCron from './cron'
import { init } from './files'
import server from './server'

const index = async () => {
    await init()
    setupCron()
    server()
}

index()
