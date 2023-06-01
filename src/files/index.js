const fs = require('fs')
const { TIMES_FILE_PATH } = require('../config')

const checkIfExists = async () => {
    try {
        await fs.promises.access(TIMES_FILE_PATH, fs.constants.F_OK)
        return true
    } catch (err) {
        return false
    }
}

const read = async () => {
    const content = await fs.promises.readFile(TIMES_FILE_PATH)
    const parsed = JSON.parse(content)

    return parsed
}

const write = async (content) => {
    await fs.promises.writeFile(TIMES_FILE_PATH, JSON.stringify(content, null, 2))
}

const init = async () => {
    if (!(await checkIfExists())) {
        await write({})
    }
}

module.exports = { init, read, write }
