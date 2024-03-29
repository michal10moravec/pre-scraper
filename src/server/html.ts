const PRE_TITLE = 'PRE časy spínání levného proudu'
const DAY = 'Den'
const DATE = 'Datum'
const TIMES = 'Časy spínání'

type TData = string[][]

const getHeader = (text: string) => {
    return `<h1>${text}</h1>`
}

const getTable = (header: string[], data: TData, dataLen: number) => {
    return `<table>
    <tr>${header
        .map(
            (col, i) =>
                `<th${
                    i === header.length - 1 ? ` colspan="${dataLen}"` : ''
                }>${col}</th>`
        )
        .join('')}</tr>
    ${data
        .map(
            (row) => `<tr>${row.map((col) => `<td>${col}</td>`).join('')}</tr>`
        )
        .join('')}
</table>`
}

const getHtml = (...components: string[]) => {
    return `<html>
    <head>
        <title>${PRE_TITLE}</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>${components.join('')}</body>
</html>`
}

const getStyles = () => {
    return `table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}

td {
    padding: 10px;
}`
}

const getPage = (data: TData, dataLen: number) => {
    return getHtml(
        getHeader(PRE_TITLE),
        getTable([DAY, DATE, TIMES], data, dataLen)
    )
}

export { getHtml, getHeader, getPage, getStyles }
