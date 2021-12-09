// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const textarea = document.createElement('textarea')
textarea.setAttribute('id', 'dumptext')
textarea.setAttribute('cols', '80')
textarea.setAttribute('rows', '20')
const clearupHexDump = (val) => {
    return val.trim()
        .replace(new RegExp('[0-9]{5}.[0-9]{3}([\\s])*', 'ig'), '')
        .replace(new RegExp('\\(\\+[0-9]{3}.[0-9]{3}\\)([\\s])*', 'ig'), '')
        .replace(new RegExp('(F0 00 01 0C 01)', 'ig'), '\n$1')
        .replace(new RegExp('  ', 'ig'), ' ')
        .replace(new RegExp('\n\n\n', 'ig'), '\n')
}

textarea.value = `
00539.766		F0 00 01 0C 01 01 01 00 00 01 00 01 00 01 00 00 
00539.766		00 00 00 01 00 01 00 01 00 00 01 02 02 06 03 00 
00539.766		02 08 02 0C 00 00 03 0F 01 0B 03 00 07 0F 01 0A 
00539.766		07 0D 07 0F 07 0F 00 00 00 00 00 00 00 00 00 00 
00539.766		03 00 0C 00 00 00 00 00 03 00 0C 00 02 0D 00 00 
00539.766		02 00 00 0F 00 01 02 00 02 00 03 01 03 0F 00 00 
00539.766		00 0F 00 00 00 0B 00 00 00 02 00 00 00 00 00 00 
00539.766		00 00 00 00 00 00 04 03 04 0C 04 05 04 01 04 0E 
00539.766		02 0B 04 03 04 0F 04 0D 05 00 05 0F 04 08 02 00 
00539.766		02 00 02 00 02 00 F7 
`
textarea.value = clearupHexDump(textarea.value)
textarea.addEventListener('change', (event) => {
    textarea.value = clearupHexDump(textarea.value)
})

document.body.appendChild(textarea)


import { Parser as Line6Parser} from './index'

// Program Patch Dump
const printData = (data) => {
    const parser = new Line6Parser()
    const dump = parser.parse(data)
    console.log("Parse1", dump.data.__rawData.length, Line6Parser.fromLBStoASCI(dump.data.data.name.program_name as number[]))
    const converted = dump.data.convert()
    console.log('Coverted', converted)
    const restored = Line6Parser.convertDataToLBS(converted, true)
    console.log('Restored', restored)
}

textarea.addEventListener('change', (event) => {
    printData(textarea.value.trim().split(' '))
})

printData(textarea.value.trim().split(' '))