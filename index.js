const setupCron = require('./src/cron')
const { init } = require('./src/files')
const server = require('./src/server')

const index = async () => {
    await init()
    setupCron()
    server()
}

index()
