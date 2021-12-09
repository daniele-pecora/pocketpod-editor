
export class MIDICCTable {

  static _byCC = []
  static items = [
    {
      "cc": 0,
      "desc": "Bank Select"
    },
    {
      "cc": 1,
      "desc": "Modulation Wheel or Lever"
    },
    {
      "cc": 2,
      "desc": "Breath Controller"
    },
    {
      "cc": 3,
      "desc": "Undefined"
    },
    {
      "cc": 4,
      "desc": "Foot Controller"
    },
    {
      "cc": 5,
      "desc": "Portamento Time"
    },
    {
      "cc": 6,
      "desc": "Data Entry MSB"
    },
    {
      "cc": 7,
      "desc": "Channel Volume (formerly Main Volume)"
    },
    {
      "cc": 8,
      "desc": "Balance"
    },
    {
      "cc": 9,
      "desc": "Undefined"
    },
    {
      "cc": 10,
      "desc": "Pan"
    },
    {
      "cc": 11,
      "desc": "Expression Controller"
    },
    {
      "cc": 12,
      "desc": "Effect Control 1"
    },
    {
      "cc": 13,
      "desc": "Effect Control 2"
    },
    {
      "cc": 14,
      "desc": "Undefined"
    },
    {
      "cc": 15,
      "desc": "Undefined"
    },
    {
      "cc": 16,
      "desc": "General Purpose Controller 1"
    },
    {
      "cc": 17,
      "desc": "General Purpose Controller 2"
    },
    {
      "cc": 18,
      "desc": "General Purpose Controller 3"
    },
    {
      "cc": 19,
      "desc": "General Purpose Controller 4"
    },
    {
      "cc": 20,
      "desc": "Undefined"
    },
    {
      "cc": 21,
      "desc": "Undefined"
    },
    {
      "cc": 22,
      "desc": "Undefined"
    },
    {
      "cc": 23,
      "desc": "Undefined"
    },
    {
      "cc": 24,
      "desc": "Undefined"
    },
    {
      "cc": 25,
      "desc": "Undefined"
    },
    {
      "cc": 26,
      "desc": "Undefined"
    },
    {
      "cc": 27,
      "desc": "Undefined"
    },
    {
      "cc": 28,
      "desc": "Undefined"
    },
    {
      "cc": 29,
      "desc": "Undefined"
    },
    {
      "cc": 30,
      "desc": "Undefined"
    },
    {
      "cc": 31,
      "desc": "Undefined"
    },
    {
      "cc": 32,
      "desc": "LSB for Control 0 (Bank Select)"
    },
    {
      "cc": 33,
      "desc": "LSB for Control 1 (Modulation Wheel or Lever)"
    },
    {
      "cc": 34,
      "desc": "LSB for Control 2 (Breath Controller)"
    },
    {
      "cc": 35,
      "desc": "LSB for Control 3 (Undefined)"
    },
    {
      "cc": 36,
      "desc": "LSB for Control 4 (Foot Controller)"
    },
    {
      "cc": 37,
      "desc": "LSB for Control 5 (Portamento Time)"
    },
    {
      "cc": 38,
      "desc": "LSB for Control 6 (Data Entry)"
    },
    {
      "cc": 39,
      "desc": "LSB for Control 7 (Channel Volume, formerly Main Volume)\n "
    },
    {
      "cc": 40,
      "desc": "LSB for Control 8 (Balance)"
    },
    {
      "cc": 41,
      "desc": "LSB for Control 9 (Undefined)"
    },
    {
      "cc": 42,
      "desc": "LSB for Control 10 (Pan)"
    },
    {
      "cc": 43,
      "desc": "LSB for Control 11 (Expression Controller)"
    },
    {
      "cc": 44,
      "desc": "LSB for Control 12 (Effect control 1)"
    },
    {
      "cc": 45,
      "desc": "LSB for Control 13 (Effect control 2)"
    },
    {
      "cc": 46,
      "desc": "LSB for Control 14 (Undefined)"
    },
    {
      "cc": 47,
      "desc": "LSB for Control 15 (Undefined)"
    },
    {
      "cc": 48,
      "desc": "LSB for Control 16 (General Purpose Controller 1)"
    },
    {
      "cc": 49,
      "desc": "LSB for Control 17 (General Purpose Controller 2)"
    },
    {
      "cc": 50,
      "desc": "LSB for Control 18 (General Purpose Controller 3)"
    },
    {
      "cc": 51,
      "desc": "LSB for Control 19 (General Purpose Controller 4)"
    },
    {
      "cc": 52,
      "desc": "LSB for Control 20 (Undefined)"
    },
    {
      "cc": 53,
      "desc": "LSB for Control 21 (Undefined)"
    },
    {
      "cc": 54,
      "desc": "LSB for Control 22 (Undefined)"
    },
    {
      "cc": 55,
      "desc": "LSB for Control 23 (Undefined)"
    },
    {
      "cc": 56,
      "desc": "LSB for Control 24 (Undefined)"
    },
    {
      "cc": 57,
      "desc": "LSB for Control 25 (Undefined)"
    },
    {
      "cc": 58,
      "desc": "LSB for Control 26 (Undefined)"
    },
    {
      "cc": 59,
      "desc": "LSB for Control 27 (Undefined)"
    },
    {
      "cc": 60,
      "desc": "LSB for Control 28 (Undefined)"
    },
    {
      "cc": 61,
      "desc": "LSB for Control 29 (Undefined)"
    },
    {
      "cc": 62,
      "desc": "LSB for Control 30 (Undefined)"
    },
    {
      "cc": 63,
      "desc": "LSB for Control 31 (Undefined)"
    },
    {
      "cc": 64,
      "desc": "Damper Pedal on/off (Sustain)"
    },
    {
      "cc": 65,
      "desc": "Portamento On/Off"
    },
    {
      "cc": 66,
      "desc": "Sostenuto On/Off"
    },
    {
      "cc": 67,
      "desc": "Soft Pedal On/Off"
    },
    {
      "cc": 68,
      "desc": "Legato Footswitch"
    },
    {
      "cc": 69,
      "desc": "Hold 2"
    },
    {
      "cc": 70,
      "desc": "Sound Controller 1 (default: Sound Variation)"
    },
    {
      "cc": 71,
      "desc": "Sound Controller 2 (default: Timbre/Harmonic Intens.)"
    },
    {
      "cc": 72,
      "desc": "Sound Controller 3 (default: Release Time)"
    },
    {
      "cc": 73,
      "desc": "Sound Controller 4 (default: Attack Time)"
    },
    {
      "cc": 74,
      "desc": "Sound Controller 5 (default: Brightness)"
    },
    {
      "cc": 75,
      "desc": "Sound Controller 6 (default: Decay Time - see MMA RP-021)\n "
    },
    {
      "cc": 76,
      "desc": "Sound Controller 7 (default: Vibrato Rate - see MMA RP-021)\n "
    },
    {
      "cc": 77,
      "desc": "Sound Controller 8 (default: Vibrato Depth - see MMA\n RP-021)"
    },
    {
      "cc": 78,
      "desc": "Sound Controller 9 (default: Vibrato Delay - see MMA\n RP-021)"
    },
    {
      "cc": 79,
      "desc": "Sound Controller 10 (default undefined - see MMA RP-021)\n "
    },
    {
      "cc": 80,
      "desc": "General Purpose Controller 5"
    },
    {
      "cc": 81,
      "desc": "General Purpose Controller 6"
    },
    {
      "cc": 82,
      "desc": "General Purpose Controller 7"
    },
    {
      "cc": 83,
      "desc": "General Purpose Controller 8"
    },
    {
      "cc": 84,
      "desc": "Portamento Control"
    },
    {
      "cc": 85,
      "desc": "Undefined"
    },
    {
      "cc": 86,
      "desc": "Undefined"
    },
    {
      "cc": 87,
      "desc": "Undefined"
    },
    {
      "cc": 88,
      "desc": "High Resolution Velocity Prefix"
    },
    {
      "cc": 89,
      "desc": "Undefined"
    },
    {
      "cc": 90,
      "desc": "Undefined"
    },
    {
      "cc": 91,
      "desc": "Effects 1 Depth \n (default: Reverb Send Level - see\n MMA RP-023) \n (formerly External Effects Depth)"
    },
    {
      "cc": 92,
      "desc": "Effects 2 Depth (formerly Tremolo Depth)"
    },
    {
      "cc": 93,
      "desc": "Effects 3 Depth \n (default: Chorus Send Level - see\n MMA RP-023) \n (formerly Chorus Depth)"
    },
    {
      "cc": 94,
      "desc": "Effects 4 Depth (formerly Celeste [Detune] Depth)"
    },
    {
      "cc": 95,
      "desc": "Effects 5 Depth (formerly Phaser Depth)"
    },
    {
      "cc": 96,
      "desc": "Data Increment (Data Entry +1) (see MMA RP-018)"
    },
    {
      "cc": 97,
      "desc": "Data Decrement (Data Entry -1) (see MMA RP-018)"
    },
    {
      "cc": 98,
      "desc": "Non-Registered Parameter Number (NRPN) - LSB"
    },
    {
      "cc": 99,
      "desc": "Non-Registered Parameter Number (NRPN) - MSB"
    },
    {
      "cc": 100,
      "desc": "Registered Parameter Number (RPN) - LSB*"
    },
    {
      "cc": 101,
      "desc": "Registered Parameter Number (RPN) - MSB*"
    },
    {
      "cc": 102,
      "desc": "Undefined"
    },
    {
      "cc": 103,
      "desc": "Undefined"
    },
    {
      "cc": 104,
      "desc": "Undefined"
    },
    {
      "cc": 105,
      "desc": "Undefined"
    },
    {
      "cc": 106,
      "desc": "Undefined"
    },
    {
      "cc": 107,
      "desc": "Undefined"
    },
    {
      "cc": 108,
      "desc": "Undefined"
    },
    {
      "cc": 109,
      "desc": "Undefined"
    },
    {
      "cc": 110,
      "desc": "Undefined"
    },
    {
      "cc": 111,
      "desc": "Undefined"
    },
    {
      "cc": 112,
      "desc": "Undefined"
    },
    {
      "cc": 113,
      "desc": "Undefined"
    },
    {
      "cc": 114,
      "desc": "Undefined"
    },
    {
      "cc": 115,
      "desc": "Undefined"
    },
    {
      "cc": 116,
      "desc": "Undefined"
    },
    {
      "cc": 117,
      "desc": "Undefined"
    },
    {
      "cc": 118,
      "desc": "Undefined"
    },
    {
      "cc": 119,
      "desc": "Undefined"
    },
    {
      "cc": 120,
      "desc": "[Channel Mode Message] All Sound Off"
    },
    {
      "cc": 121,
      "desc": "[Channel Mode Message] Reset All Controllers \n (See\n MMA RP-015)"
    },
    {
      "cc": 122,
      "desc": "[Channel Mode Message] Local Control On/Off"
    },
    {
      "cc": 123,
      "desc": "[Channel Mode Message] All Notes Off"
    },
    {
      "cc": 124,
      "desc": "[Channel Mode Message] Omni Mode Off (+ all notes off)"
    },
    {
      "cc": 125,
      "desc": "[Channel Mode Message] Omni Mode On (+ all notes off)"
    },
    {
      "cc": 126,
      "desc": "[Channel Mode Message] Mono Mode On (+ poly off, + all\n notes off)"
    },
    {
      "cc": 127,
      "desc": "[Channel Mode Message] Poly Mode On (+ mono off, +all notes\n off)"
    }
  ].map(item => { MIDICCTable._byCC[item.cc] = item; return item })

  public static byCC(cc: number) { return MIDICCTable._byCC[cc] }
}

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import WebMidiAPI, { Output as MidiOutput, Input as MidiInput, InputEvents, WebMidi, MidiSystemMessages, IMidiChannel } from 'webmidi';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Mainly a wrapper for WebMidi
 */
export class WebMidiApiService implements OnDestroy {
  public static MIDICC_LABLES = MIDICCTable

  static get verbose(): boolean { return environment.__logging }
  static get verbose_listener(): boolean { return false }

  public static MIDI_SYSTEM_MESSAGES: MidiSystemMessages = WebMidiAPI.MIDI_SYSTEM_MESSAGES

  outputDeviceSource = new BehaviorSubject<MidiOutputEvent>({ previousValue: null, currentValue: null })
  outputDevice: Observable<MidiOutputEvent> = this.outputDeviceSource.asObservable()

  inputDeviceSource = new BehaviorSubject<MidiInputEvent>({ previousValue: null, currentValue: null })
  inputDevice: Observable<MidiInputEvent> = this.inputDeviceSource.asObservable()

  midiChannelSource = new BehaviorSubject<MidiChannelEvent>({ previousValue: null, currentValue: 1 })
  midiChannel: Observable<MidiChannelEvent> = this.midiChannelSource.asObservable()

  OutputDevice: MidiOutput = null
  InputDevice: MidiInput = null
  MidiChannel: number = 1

  subOutput: Subscription
  subInput: Subscription
  subMidiChannel: Subscription

  constructor() {
    this.subInput = this.inputDevice.subscribe((event) => {
      this.InputDevice = event.currentValue
      if (WebMidiApiService.verbose) {
        console.log('MIDI - Configured input device', this.InputDevice)
      }
    })
    this.subOutput = this.outputDevice.subscribe((event) => {
      this.OutputDevice = event.currentValue
      if (WebMidiApiService.verbose) {
        console.log('MIDI - Configured output device', this.OutputDevice)
      }
    })
    this.subMidiChannel = this.midiChannelSource.subscribe(event => {
      this.MidiChannel = event.currentValue
      if (WebMidiApiService.verbose) {
        console.log('MIDI - Configured midi channel', this.MidiChannel)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subInput)
      this.subInput.unsubscribe()
    if (this.subOutput)
      this.subOutput.unsubscribe()
  }

  updateOutputDevice(device: MidiOutput) {
    this.outputDeviceSource.next({ currentValue: device, previousValue: this.OutputDevice })
  }

  updateInputDevice(device: MidiInput) {
    this.inputDeviceSource.next({ currentValue: device, previousValue: this.InputDevice })
  }

  updateMidiChannel(midiChannel: number) {
    this.midiChannelSource.next({ currentValue: midiChannel, previousValue: this.MidiChannel })
  }

  // --------- SEND ----------
  public static send(
    outputDevice: MidiOutput,
    status: number,
    data?: number[],
    timestamp?: DOMHighResTimeStamp
  ): MidiOutput {
    if (WebMidiApiService.verbose)
      return outputDevice.send(status, data)
  }

  send(
    status: number,
    data?: number[],
    timestamp?: DOMHighResTimeStamp
  ) {
    WebMidiApiService.send(this.OutputDevice, status, data, timestamp)
  }
  // --------- PROGRAM ----------
  public static sendProgramChange(programNumber: number, midiChannel: number, outputDevice: MidiOutput) {
    if (WebMidiApiService.verbose) {
      console.log('MIDI - sendProgramChange' + (!outputDevice ? '[NO DEVICE]' : ''), 'prog:', programNumber, 'chnl:', midiChannel, 'dev:', outputDevice)
    }
    if (outputDevice)
      outputDevice.sendProgramChange(programNumber, midiChannel)
  }
  sendProgramChange(programNumber: number) {
    WebMidiApiService.sendProgramChange(programNumber, this.MidiChannel, this.OutputDevice)
  }

  // --------- CC ----------
  public static sendControlChange(cc: number, value: number, midiChannel: number, outputDevice: MidiOutput) {
    if (WebMidiApiService.verbose) {
      console.log('MIDI - sendControlChange' + (!outputDevice ? '[NO DEVICE]' : ''), 'CC:', `${cc} : '${MIDICCTable?.byCC(cc)?.desc}'`, 'val:', value, 'chnl:', midiChannel, 'dev:', outputDevice)
    }
    if (outputDevice)
      outputDevice.sendControlChange(cc, value, midiChannel)
  }
  sendControlChange(cc: number, value: number) {
    WebMidiApiService.sendControlChange(cc, value, this.MidiChannel, this.OutputDevice)
  }

  // --------- SYSEX ----------
  public sendSysex(data: number[]): MidiOutput {
    return WebMidiApiService.sendSysex(data, this.OutputDevice)
  }
  /**
   * Use `send(...)` to prevent misplaced error caused by checking range:
   * `ERROR RangeError: The data bytes of a sysex message must be integers between 0 (0x00) and 127 (0x7F).`
   */
  public static sendSysex(data: number[], outputDevice: MidiOutput): MidiOutput {
    let dataToSend = [].concat(data)
    if (dataToSend[0] === 0xF0) {
      /** remove first byte `0x0F` it will be taken from `status` */
      dataToSend = dataToSend.slice(1)
    }
    if (dataToSend[dataToSend.length - 1] !== 0xF7) {
      /** add missing sysex EOX byte 0xF7 */
      dataToSend.push(0xF7)
    }
    const output = outputDevice ? outputDevice.send(WebMidiApiService.MIDI_SYSTEM_MESSAGES.sysex, dataToSend) : null
    if (WebMidiApiService.verbose) {
      const hexdata = [WebMidiApiService.MIDI_SYSTEM_MESSAGES.sysex].concat(dataToSend).map((item, index) => {
        return ('00' + item.toString(16)).split('').slice(-2).join('').toUpperCase()
      })
      var hexval = []
      hexdata.map((item, index, all) => {
        if (index > 0 && index % 16 == 0) {
          hexval.push('\n')
        }
        hexval.push(item)
      })
      console.log('MIDI - sendSysex' + (!outputDevice ? '[NO DEVICE]' : ''), data, 'hex', hexdata, 'hex-string\n', hexval.join(' '), hexval, output)
    }
    return output
  }

  /**
   * Send a <strong>UNIVERSAL DEVICE INQUIRY</strong>
   * @param outputDevice
   * @param channel A number between 1-16 (default 1)
   */
  public static sendSysexMessage_UniversalDeviceInquiry(channel: number, outputDevice: MidiOutput) {
    // const chn: number = 0x01 //  0xF7 // Universal All Device Call - is currently not working
    const data: number[] = [0xF0, 0x7E, (channel || 0x01), 0x06, 0x01, 0xF7]
    return WebMidiApiService.sendSysex(data, outputDevice)
  }
  /**
   * Send a <strong>UNIVERSAL DEVICE INQUIRY</strong>
   * @param channel A number between 1-16 (default 1)
   */
  sendSysexMessage_UniversalDeviceInquiry(channel: number) {
    return WebMidiApiService.sendSysexMessage_UniversalDeviceInquiry(channel, this.OutputDevice)
  }
  public static sendSysexMessage_DumpProgram(outputDevice: MidiOutput) {
    this.sendSysexMessage(outputDevice, SysexOpCodes.READ_PROGRAM_DUMP, [0x01])
  }
  sendSysexMessage_DumpProgram() {
    WebMidiApiService.sendSysexMessage_DumpProgram(this.OutputDevice)
  }
  public static sendSysexMessage_DumpProgramAll(outputDevice: MidiOutput) {
    WebMidiApiService.sendSysexMessage(outputDevice, SysexOpCodes.READ_PROGRAM_DUMP_ALL)
  }
  sendSysexMessage_DumpProgramAll() {
    WebMidiApiService.sendSysexMessage_DumpProgramAll(this.OutputDevice)
  }
  public static sendSysexMessage_DumpProgramEdit(outputDevice: MidiOutput) {
    WebMidiApiService.sendSysexMessage(outputDevice, SysexOpCodes.READ_PROGRAM_EDIT)
  }
  sendSysexMessage_DumpProgramEdit() {
    WebMidiApiService.sendSysexMessage_DumpProgramEdit(this.OutputDevice)
  }
  /**
   * @param outputDevice
   * @param opCode
   * @param dataValue Any data to submit within this `opCode`.
   *                  e.g. Programm number when calling opCode `SysexOpCodes.PROGRAM_DUMP` or `SysexOpCodes.PROGRAM_EDIT`
   */
  private static sendSysexMessage(outputDevice: MidiOutput, opCode: SysexOpCodes, dataValue?: number[]) {
    if (opCode.dataRequired && !(dataValue || []).length) {
      throw `The OPCODE ${opCode.values.join(',')} required data for '${opCode.dataName}'`
    }
    const manufacturer: number | number[] = [0x00, 0x01, 0x0C] // Line 6
    const podId = 0x01 // POD ID
    const opCodeData = opCode.dataRequired ? (dataValue || []) : []
    const data: number[] = [0xF0, ...manufacturer, podId, ...opCode.values, ...opCodeData]
    return WebMidiApiService.sendSysex(data, outputDevice)
  }

  public _sendSysexMessage(opCode: SysexOpCodes, dataValue?: number[]) {
    WebMidiApiService._sendSysexMessage(this.OutputDevice, opCode, dataValue)
  }
  /**
   * @param outputDevice
   * @param opCode
   * @param dataValue Any data to submit within this `opCode`.
   *                  e.g. Programm number when calling opCode `SysexOpCodes.PROGRAM_DUMP` or `SysexOpCodes.PROGRAM_EDIT`
   */
  public static _sendSysexMessage(outputDevice: MidiOutput, opCode: SysexOpCodes, dataValue?: number[]) {
    if (opCode.dataRequired && !(dataValue || []).length) {
      throw `The OPCODE ${opCode.values.join(',')} required data for '${opCode.dataName}'`
    }
    const manufacturer: number | number[] = [0x00, 0x01, 0x0C] // Line 6
    const podId = 0x01 // POD ID
    const opCodeData = opCode.dataRequired ? (dataValue || []) : []
    const data: number[] = [0xF0, ...manufacturer, podId, ...opCode.values, ...opCodeData]
    return WebMidiApiService.sendSysex(data, outputDevice)
  }

  // ------ LISTENER ------
  public static addListener<T extends keyof InputEvents>(
    type: T,
    channel: IMidiChannel | undefined,
    listener: (event: InputEvents[T]) => void,
    inputDevice: MidiInput
  ): MidiInput {
    if (!inputDevice)
      return inputDevice
    if (WebMidiApiService.verbose_listener) {
      console.log('MIDI - Register listener' + (!inputDevice ? '[NO DEVICE]' : ''), 'type:', type, 'chnl:', channel, 'listener:', (listener || '<empty>').toString(), 'dev:', inputDevice)
    }
    return inputDevice ? inputDevice.addListener<T>(type, channel, listener) : inputDevice
  }

  addListener<T extends keyof InputEvents>(
    type: T,
    channel: IMidiChannel | undefined,
    listener: (event: InputEvents[T]) => void
  ): MidiInput {
    return WebMidiApiService.addListener(type, channel, listener, this.InputDevice)
  }

  public static removeListener<T extends keyof InputEvents>(
    inputDevice: MidiInput,
    type?: T,
    channel?: IMidiChannel,
    listener?: (event: InputEvents[T]) => void
  ): MidiInput {
    if (!inputDevice || !channel)
      return inputDevice
    if (WebMidiApiService.verbose_listener) {
      console.log('MIDI - Remove listener' + (!inputDevice ? '[NO DEVICE]' : ''), 'type:', type, 'chnl:', channel, 'listener:', (listener || '<empty>').toString(), 'dev:', inputDevice)
    }
    return inputDevice ? inputDevice.removeListener(type, channel, listener) : inputDevice
  }

  removeListener<T extends keyof InputEvents>(
    type?: T,
    channel?: IMidiChannel,
    listener?: (event: InputEvents[T]) => void
  ): MidiInput {
    return WebMidiApiService.removeListener(this.InputDevice, type, channel, listener)
  }
}

export interface MidiOutputEvent {
  currentValue: MidiOutput
  previousValue: MidiOutput
}

export interface MidiInputEvent {
  currentValue: MidiInput
  previousValue: MidiInput
}

export interface MidiChannelEvent {
  currentValue: number
  previousValue: number
}

export class SysexOpCodes {
  get values() { return [].concat(this.data) }
  private constructor(private data: number[], public dataRequired?: boolean, public dataName?: string) { }
  public static READ_PROGRAM_DUMP = new SysexOpCodes([0x00, 0x00], true, 'program number') // Program Patch Dump Request/Read
  public static READ_PROGRAM_EDIT = new SysexOpCodes([0x00, 0x01]) // Program Edit Buffer Dump Request/Read
  public static READ_PROGRAM_DUMP_ALL = new SysexOpCodes([0x00, 0x02]) // All Programs Dump Request/Read

  public static WRITE_PROGRAM_DUMP = new SysexOpCodes([0x01, 0x00], true, 'program number') // Program Patch Dump Response/Write
  public static WRITE_PROGRAM_EDIT = new SysexOpCodes([0x01, 0x01]) // Program Edit Buffer Dump Response/Write
  public static WRITE_PROGRAM_DUMP_ALL = new SysexOpCodes([0x01, 0x02]) // All Programs Dump Response/Write
}