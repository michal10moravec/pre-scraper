const { init } = require('./src/files')
const server = require('./src/server')

const index = async () => {
    await init({})
    server()
}

index()
