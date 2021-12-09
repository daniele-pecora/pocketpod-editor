import { ProgramDataSysex } from './line6-parser-util'

export interface SysExData {
    __rawData: number[]
    start: number
    manufactor: number[]
    end: number
}

export interface ProgramDump extends SysExData {
    /**
     * Action may be one of
     * 
     * Requests:
     * `0x00 0x00` read a specific program (program?:number must be provided)
     * `0x00 0x01` read current selected program
     * `0x00 0x02` read all programs
     * 
     * Responses:
     * `0x01 0x00` the specif choosen program (program?:number is also provided)
     * `0x01 0x01` the current selected program
     * `0x01 0x02` all programs
     * 
     * Will be `null` if it is a 'Program store' response:
     * `0xf0 0x00 0x01 0x0c 0x01 0x06 0xf7`
     * 
     */
    action: number[]
    /**
     * The number of the program/patch in case or reading or writing (persistant) a specific program.
     * Empty if the current selected program is to read or write (not persistant).
     */
    program?: number
    /**
     * Any program data or `null` if not a dump response
     */
    data: ProgramData
}

export interface ProgramData {
    __rawData: number[]
    version: number[]
    data: ProgramDataSysex
    convert: () => ProgramDataSysex
}

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
export interface Line6UniversalDeviceInquiry {
    manufactor: number[]
    version: number[]
    versionString: string
}