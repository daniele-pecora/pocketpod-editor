import { Line6UniversalDeviceInquiry, ProgramDump, ProgramData } from "./line6-dump-model"
import { ProgramDataSysexMapper, ProgramDataSysex, ProgramDataSysexExporter } from './line6-parser-util'
/**
 * <code>
  F0 7E <chan> 06 02  - Universal Device Inquiry Response
  00 01 0c            - Line 6 (Fast Forward) Manufacturer ID
  00 00               - 0x0000 = POD Product Family ID (LSB first)
  00 01               - 0x0100 = POD Product Family Member (LSB first)
  xx xx xx xx         - Software revision, ASCI (ex. 30 31 30 30 = '0100' = 1.00)
  F7                  - EOX
 * </code>
 */
export class Line6UniversalDeviceInquiryParser {
    /**
     * 
     * @param data 
     * @returns `null` if it is not an "Universal Device Inquiry" response
     */
    parse(data: Uint8Array): Line6UniversalDeviceInquiry {

        const buf2hex = (buffer) => { // buffer is an ArrayBuffer
            return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2))// .join('');
        }
        /**
         * Is a "Universal Device Inquiry" response?
         */
        const sig = buf2hex([...data.slice(0, 2), ...data.slice(3, 5)])
        if (`${sig.join('').toLowerCase()}` !== 'f07e0602') {
            return null
        }

        const result: Line6UniversalDeviceInquiry = {
            manufactor: [],
            version: [],
            versionString: ''
        }
        const _data = []
        data.map((item, index, all) => {
            _data.push(item)
            return item
        })
        result.manufactor = _data.slice(4, 7)
        result.version = _data.slice(12, 16)

        const _a = result.version.slice(0, 2)
        const _b = result.version.slice(2)
        const a = Number.parseInt(_a.map.call(_a, x => String.fromCharCode(x)).join(''))
        const b = _b.map.call(_b, x => String.fromCharCode(x)).join('')
        result.versionString = `${a}.${b}`
        return result
    }
}

// API
export class ProgramDataParser {
    get rawData() { return [].concat(this.data) }
    /**
     * 
     * @param data The data without the version bytes
     */
    constructor(private data: number[]) {
        if ((data || []).length !== 142) {
            throw new Error(`ProgramDataParser: 'PROGRAM DATA' must be an array of exact length 142 but is ${(data || []).length}`)
        }
    }

    /**
     * Provide values from the "High-Low Nibbilized format" data
     */
    public prg(offset: number, length: number = 1): number[] {
        return ProgramDataParser.sub(this.data, offset * 2, length * 2)
    }
    /**
     * Simple wrapper for `Array#slice` but
     * provide values from the "High-Low Nibbilized format" data
     */
    public prgslice(start: number, end: number): number[] {
        return ProgramDataParser.sub(this.data, start * 2, Number.isInteger(end) ? end * 2 : undefined)
    }
    /**
     * Provides a sub-array
     */
    private sub(offset: number, length?: number): number[] {
        return ProgramDataParser.sub(this.data, offset, Number.isInteger(length) ? offset + length : undefined)
    }

    /**
     * Simple wrapper for `Array#slice`
     */
    public slice(start?: number, end?: number): number[] {
        return this.data.slice(start, end)
    }

    // provide values from the "High-Low Nibbilized format"
    private static prg(data: number[], offset: number, length: number): number[] {
        return ProgramDataParser.sub(data, offset * 2, length * 2)
    }

    private static sub(data: number[], offset: number, length?: number): number[] {
        return data.slice(offset, Number.isInteger(length) ? offset + length : undefined)
    }
}

export class Parser {

    private _action(data: number[]) {
        const _action = []
        data.slice(5, 7).map(item => _action.push(("00" + item.toString(16)).slice(-2)))
        return _action.join('')
    }

    parse(UIntdata): ProgramDump {
        const data: number[] = []
        // convert from UIntArray to number[]
        UIntdata.map(item => data.push(item))

        const isProgramEditResponse = data.length === 7
        const _action = isProgramEditResponse ? null : this._action(data)
        const isProgramDump = _action === '0100'

        const dump: ProgramDump = {
            __rawData: data,
            start: data[0],
            manufactor: data.slice(1, 5),
            action: isProgramEditResponse ? null : data.slice(5, 7),
            data: null,
            end: data.slice(-1)[0]
        }
        if (isProgramEditResponse) {
            // It may be a response from command 'Store program' 
            // like `f0 00 01 0c 01 06 f7`
        } else {
            const dataStartIndex = isProgramDump ? 8 : 7
            if (isProgramDump) {
                dump.program = data.slice(7, 8)[0]
            }
            const prg_data = data.slice(dataStartIndex, -1)
            if ((prg_data || []).length) {
                dump.data = this.parseData_Program_Edit_Buffer_Dump(prg_data)
                dump['convert'] = () => { return Parser.convertData(dump.data.data) }
            } else {
                console.error('No parsable program data provided', data, 'dump:', dump)
                throw new Error('No parsable program data provided')
            }
        }
        return dump
    }

    parseData_Program_Patch_Dump(programData): ProgramData {
        return this.parseData(programData, 143)
    }

    parseData_Program_Edit_Buffer_Dump(programData): ProgramData {
        return this.parseData(programData, 143)
    }

    parseData(programData, verifyLen): ProgramData {
        if (verifyLen && (programData || []).length !== verifyLen) {
            throw new Error(`'PROGRAM DATA' must be an array of exact length ${verifyLen} but is ${(programData || []).length}`)
        }
        const version = programData.slice(0, 1)
        // extract the version bytes so the index will match the PROGRAM DATA reference
        const data = new ProgramDataParser(programData.slice(1))

        const prgData = ProgramDataSysexMapper(data)

        const dump = {
            __rawData: programData,
            version: version,
            data: prgData,
            convert: () => { return Parser.convertData(prgData) }
        }
        return dump as ProgramData
    }

    /**
     * convert data from 'use only least significant bit' to number values
     */
    public static convertData(data: ProgramDataSysex): ProgramDataSysex {
        // convert from lbs 
        const converted = {}
        Object.keys(data).map(gk => {
            converted[gk] = converted[gk] || {}
            Object.keys(data[gk]).map(pk => {
                converted[gk][pk] = Parser.convertFromLBS(data[gk][pk])
                /**
                 * Convert name to string(16) value
                 */
                if ('name' === gk && 'program_name' === pk) {
                    converted[gk][pk] = Parser.fromLBStoASCI(data[gk][pk] as number[])
                } else {
                    converted[gk][pk] = Number.parseInt(converted[gk][pk], 16)
                }
            })
        })
        return converted as ProgramDataSysex
    }

    /**
     * convert data to 'use only least significant bit' from number values
     */
    public static convertDataToLBS(data: ProgramDataSysex, asHex?: boolean): ProgramDataSysex {
        // convert from lbs 
        const converted = {}
        Object.keys(data).map(gk => {
            converted[gk] = converted[gk] || {}
            Object.keys(data[gk]).map(pk => {
                /**
                 * Convert name to string(16) value
                 */
                if ('name' === gk && 'program_name' === pk) {
                    const _nam = ((data[gk][pk] || '') + '                ').split('').slice(0, 16).join('')
                    data[gk][pk] = _nam as unknown as number[]
                    converted[gk][pk] = Parser.fromASCItoLBS(`${data[gk][pk]}`, asHex)
                } else {
                    const val = ('00' + data[gk][pk].toString(16)).slice(-2)
                    converted[gk][pk] = [`0${val[0]}`, `0${val[1]}`]
                    if (!asHex) {
                        converted[gk][pk] = converted[gk][pk].map(item => Number.parseInt(item, 16))
                    }
                }
            })
        })
        return converted as ProgramDataSysex
    }

    private static calculate(value: number[]) {
        const hexArray = []
        // convert to hex from UintArray (if not already)
        value.map(item => hexArray.push(("00" + item.toString(16)).slice(-2)))

        // use only least significant bit
        const lsbArray = [];
        for (let i = 0; i < hexArray.length; i++) {
            const a = hexArray[i].slice(-1) + hexArray[++i].slice(-1)
            lsbArray.push(a)
        }
        return lsbArray
    }

    public static convertFromLBS(value: number[]) {
        return Parser.calculate(value)
    }

    public static fromLBStoASCI(value: number[]): string {
        return Parser.convertFromLBS(value)
            .map(item => String.fromCharCode(Number.parseInt(item, 16)))
            .join('')
    }

    public static fromASCItoLBS(value: string, asHex?: boolean): number[] {
        let result = value
            .split('') // make char array from string
            .map(item => ('00' + item.charCodeAt(0).toString(16)).slice(-2)) // assert it is hex stirng values
            .join('') // create one string of it
            .split('') // make char array from string
            .map(item => ('00' + item).slice(-2)) // create LBS hex values
            .map(item => asHex ? item : Number.parseInt(item, 16)) // convert to byte values
        return result as unknown as number[]
    }


    export(value: ProgramDump): number[] {
        let result = []
        // START
        result = result.concat([value.start])
        // Manufactor
        result = result.concat(value.manufactor)
        // ACTION
        result = result.concat(value.action)
        // PROGRAM ?
        if (value.program || value.program === 0) {
            result = result.concat([value.program])
        }

        // Program DATA
        // Version
        result = result.concat(value.data.version)
        // Program
        const prg_data_sysex = Parser.convertDataToLBS(value.data.data)
        const data_sysex = ProgramDataSysexExporter(prg_data_sysex)

        result = result.concat(data_sysex)

        // END
        result = result.concat([value.end])
        return result
    }

}