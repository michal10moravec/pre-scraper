import fs from 'fs'
import { TIMES_FILE_PATH } from '../config'

export type TCache = {
    [date: string]: string[]
}

const checkIfExists = async () => {
    try {
        await fs.promises.access(TIMES_FILE_PATH, fs.constants.F_OK)
        return true
    } catch (err) {
        return false
    }
}

const read = async () => {
    const content = await fs.promises.readFile(TIMES_FILE_PATH, 'utf8')
    const parsed = JSON.parse(content) as TCache

    return parsed
}

const write = async (content: TCache) => {
    await fs.promises.writeFile(
        TIMES_FILE_PATH,
        JSON.stringify(content, null, 2)
    )
}

const init = async () => {
    if (!(await checkIfExists())) {
        await write({})
    }
}

export { init, read, write, checkIfExists }
