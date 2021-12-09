var _all_rows_html = document.querySelector('table:nth-of-type(2)').querySelectorAll('tr:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3))')
var all_rows = []
var _paramObjects = []
var _last_group = ''
var _last_name = ''
for (var i = 0; i < _all_rows_html.length; i++) { all_rows.push(_all_rows_html[i]) }
var _a = all_rows.map((item, index, all) => {
    var cols = item.querySelectorAll('td')
    if (cols.length === 12 && -1 === cols[0].innerHTML.indexOf('END FX')) {
        
        var group = item.querySelector('td:nth-of-type(1)').innerHTML.trim().replace(new RegExp('<br>', 'ig'), ' ')
        var name = item.querySelector('td:nth-of-type(2)').innerHTML.trim().replace(new RegExp('<br>', 'ig'), ' ')
        var cc = Number.parseInt(item.querySelector('td:nth-of-type(4)').innerHTML)
        var min = Number.parseInt(item.querySelector('td:nth-of-type(5)').innerHTML)
        var max = Number.parseInt(item.querySelector('td:nth-of-type(6)').innerHTML)
        var specialNote = item.querySelector('td:nth-of-type(3)').innerHTML
        var dataFormatNote = item.querySelector('td:nth-of-type(11)').innerHTML
        var controlledBy = item.querySelector('td:nth-of-type(12)').innerHTML
        var pos = item.querySelector('td:nth-of-type(7)')
        if (pos) {
            pos = pos.innerHTML.split('<br>')
            pos = pos.map(item => { try { return Number.parseInt(item) } catch (e) { } })
        }
        if (group) { _last_group = group }
        if (name) { _last_name = name }


        var _cleanName = (s) => {
            return (s || '').toLowerCase()
                .replace(new RegExp('[ \\(\\)-./\\\\]', 'ig'), '_')
        }
        var _cleanHTML = (st) => {
            return (st || '')
                .replace(new RegExp('<br>', 'ig'), '\n')
                .replace(new RegExp('<br/>', 'ig'), '\n')
        }

        var paramObject = {}
        paramObject.group = group || _last_group
        paramObject.name = name || _last_name
        paramObject.varGroup = _cleanName(paramObject.group)
        paramObject.varName = _cleanName(paramObject.name)
        paramObject.pos = pos
        paramObject.cc = cc
        paramObject.min = min
        paramObject.max = max
        paramObject.specialNote = _cleanHTML(specialNote)
        paramObject.dataFormatNote = _cleanHTML(dataFormatNote)
        paramObject.controlledBy = _cleanHTML(controlledBy)
        paramObject.unused = -1 !== paramObject.dataFormatNote.toLowerCase().indexOf('not used')
        paramObject.internal_use = -1 !== paramObject.dataFormatNote.toLowerCase().indexOf('internal use only')
        _paramObjects.push(paramObject)
    }
})

var groupedParamObjects = {}
var __els = _paramObjects.map(item => {
    groupedParamObjects[item.varGroup] = groupedParamObjects[item.varGroup] || {}
    groupedParamObjects[item.varGroup][item.varName] = groupedParamObjects[item.varGroup][item.varName] || {}
    var il = groupedParamObjects[item.varGroup][item.varName]
    il.pos = il.pos || []
    il.pos = il.pos.concat(item.pos)
    il.start = il.pos[0]
    il.end = item.pos.slice(-1)[0]
    il.length = il.pos.length
    il.cc = item.cc
    il.min = item.min
    il.max = item.max
    il.unused = item.unused
    il.internal_use = item.internal_use
    return item
})

// create object
var _exportObject = []
var _parserObject = {}
var _schemaObject = {}
var _mapperTypeObject = {}
var keysOfGroups = Object.keys(groupedParamObjects)
var count = 0
var _countByKey = {}
var _tmp = keysOfGroups.map(groupKey => {
    Object.keys(groupedParamObjects[groupKey]).map(paramKey => {

        var el = groupedParamObjects[groupKey][paramKey]

        // count
        count = count + el.pos.length
        _countByKey[el.start] = el.pos

        var jdoc = `
        /** 
         \`\`\`json
          ${JSON.stringify(el)}
         \`\`\` 
         */
        `
        var logInfo = `index: ${_exObject.length} start: ${el.start}  pos: ${el.pos} - pos.len: ${el.pos.length} len: ${el.length} sum: ${count}`

        /** TYPE */
        _mapperTypeObject[groupKey] = _mapperTypeObject[groupKey] || {}
        _mapperTypeObject[groupKey][paramKey] = 'number[]|number'

        /** SCHEMA */
        _schemaObject[groupKey] = _schemaObject[groupKey] || {}
        _schemaObject[groupKey][paramKey] = el

        /** PARSER  */
        _parserObject[groupKey] = groupedParamObjects[groupKey] || {}
        _parserObject[groupKey][paramKey] = `getVal(__prg_schema.${groupKey}.${paramKey}.start, __prg_schema.${groupKey}.${paramKey}.length)`

        /** EXPORTER */
        _exportObject.push(`    addVal(__prg_data.${groupKey}.${paramKey}, __prg_schema.${groupKey}.${paramKey}.start)`)
    })
})


var _exObjectCount = 0
Object.keys(_countByKey).map(key => _exObjectCount += _countByKey[key].length)
_exportObject.push(`    /** total bytes ${_exObjectCount}x2 */`)

var parserObject = '/** Parser of the program/patch data contained in the MIDI Sysex message */\n' + JSON.stringify(_parserObject, null, 2)
    // remove any quote from value
    .replace(new RegExp('"', 'ig'), '')
    // replace string new line with real new line
    .replace(new RegExp('\\\\n', 'ig'), '\n')


var mapperTypeObject = JSON.stringify(_mapperTypeObject, null, 2)
    // remove any quote from value
    .replace(new RegExp('"', 'ig'), '')

var mapperTypeCodeString = `
    /** 
     * Representation of the program/patch data contained in the MIDI Sysex message.
     * All types are \`number[]\` as format 'use only least significant bit'
     * when converted to a single int value then type is \`number\`.
     */
    export interface ProgramDataSysex ` + mapperTypeObject
        .replace(new RegExp('// __prg_data.*', 'ig'), '')
        .replace(new RegExp('__prg_data.*', 'ig'), 'number[]|number')
        //.replace(new RegExp('__prg_schema.*','ig'),'number[]|number')
        .replace(new RegExp('},', 'ig'), '}')
        .split('\n').map(item => item.trim().length > 0 ? item : '').join('\n')
        .replace(new RegExp('\n\n', 'ig'), '')



var schemaObject = JSON.stringify(_schemaObject, null, 2)
    // remove any quote from value
    .replace(new RegExp('"', 'ig'), '')

var schemaCodeString = `
/** 
 * Representation of the program/patch data schema description contained in the MIDI Sysex message.
 */
export const ProgramDataSysexSchema = ` + schemaObject

var mapperCodeString = `
import { ProgramDataSysexSchema } from "./line6-prg-data-schema"
import { ProgramDataParser } from "./line6-parsers"
import { ProgramDataSysex } from "./line6-prg-data-model"

export const ProgramDataSysexMapper = (__prg_data: IProgramDataParser):ProgramDataSysex => { 
    const __prg_schema = ProgramDataSysexSchema
    const getVal = (start: number, length: number) => {
        return __prg_data.prg(start, length)
    }
    const result:ProgramDataSysex = ${parserObject}
    return result
}

export interface IProgramDataParser {
    prg: (offset: number, length: number) => number[]
}
`
var exporterCodeString = `
import { ProgramDataSysexSchema } from "./line6-prg-data-schema"
import { ProgramDataSysex } from "./line6-prg-data-model"

export const ProgramDataSysexExporter = (__prg_data: ProgramDataSysex): number[] => {
    const __prg_schema = ProgramDataSysexSchema
    /**
     * initialize required space otherwise the index will be set as object key.<br/>
     * convert to native array, otherwise an object will and will fucks up any subsequent 'array#join()'
     */
    const value: number[] = new Array(142)
    for (let i = 0; i < value.length; i++) { value[i] = 0 }
    const addVal = (val: number[] | number, start: number) => {
        ; (Array.isArray(val) ? val : [val])
            .map((item, index, all) => value[(start * 2) + index] = item)
    }
${_exportObject.join('\n')}
    // assert array is exact 142 bytes
    if (value.length != 142) {
        throw new Error(\`ProgramDataSysex must be exact 142 bytes but is \${value.length}\`)
    }
    return value
}
`

console.log('--------------- Parser Mapper Object (line6-prg-data-exporter.ts) ---------------')
console.log('', mapperCodeString)
console.log('--------------- Parser Mapper Type (line6-prg-data-model.ts) ---------------')
console.log('', mapperTypeCodeString)
console.log('--------------- Config Schema (line6-prg-data-schema.ts) ---------------')
console.log('', schemaCodeString)
console.log('--------------- Exporter Mapper Object (line6-prg-data-exporter.ts) ---------------')
console.log('', exporterCodeString)

var all_classes = []
all_classes.push(
    `
// Copy all into file \`line6-parser-util.ts\`

// may be enabled for the example at stackblitz
// export * from './line6-parsers'
// export * from './line6-dump-model'

//
/**
 * Examples
 * <code>
        const parser = new Parser()
        const dump = parser.parse(data)
        console.log("Parse1", dump.data.__rawData.length, Parser.fromLBStoASCI(dump.data.data.name.program_name))
        const converted = dump.data.convert()
        console.log('Coverted', converted)
        const restored = Parser.convertDataToLBS(converted)
        console.log('Restored', restored)
 * </code>
 */
`)
// all_classes.push(`import { ProgramDataParser } from './line6-parsers'`)
all_classes.push(mapperInterfaceCodeString.replace(new RegExp('import .*', 'ig'), ''))
all_classes.push(schemaCodeString.replace(new RegExp('import .*', 'ig'), ''))
all_classes.push(mapperCodeString.replace(new RegExp('import .*', 'ig'), ''))
all_classes.push(exporterCodeString.replace(new RegExp('import .*', 'ig'), ''))

console.log('', all_classes.join('\n\n'))


    // alert('Just copy the structure printed out into the developer console')