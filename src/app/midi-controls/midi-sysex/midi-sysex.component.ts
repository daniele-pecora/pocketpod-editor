import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy, Output, EventEmitter, NgZone } from '@angular/core';
import { Output as MidiOutput, Input as MidiInput, InputEvents } from 'webmidi';
import { WebMidiApiService, SysexOpCodes } from '../web-midi-api.service';
import { Parser as Line6Parser, ProgramDump, Line6UniversalDeviceInquiryParser, ProgramDataSysex } from '../line6-parser/'

@Component({
  selector: 'app-midi-sysex',
  templateUrl: './midi-sysex.component.html',
  styleUrls: ['./midi-sysex.component.scss']
})
export class MidiSysexComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Set an midi output device.<br/>
   * If not set then the global device at <code>WebMidiApiService#OutputDevice</code> will be used
   */
  @Input()
  OutputDevice: MidiOutput
  /**
   * Set an midi input device.<br/>
   * If not set then the global device at <code>WebMidiApiService#InputDevice</code> will be used
   */
  @Input()
  InputDevice: MidiInput

  /**
   * The label to show within this control
   */
  @Input()
  Label: string = `MIDI Sysex Messages`

  /**
   * The number of the MIDI Channel
   */
  @Input()
  MIDIChannel: number = null
  /**
   * binding on `(MIDIChannelChange)="..."`
   */
  @Output()
  MIDIChannelChange = new EventEmitter<number>()
  /**
   * Allow changing MIDI channel
   */
  @Input()
  MIDIChannelEdit: boolean

  midiChannel = this.MIDIChannel || 1

  sysexListener: any

  /** programs */
  _programArray_tmp_no: number[]
  _programArray_tmp: ChangeSelectedProgramEvent[]
  programArray: ChangeSelectedProgramEvent[]
  programSelected: ChangeSelectedProgramEvent

  /** style */
  /**
   * Don't show card
   */
  @Input()
  styleInline: boolean = false
  inline: boolean = this.styleInline

  /**
   * Allow changing MIDI channel
   */
  @Input()
  AutoLoadPrograms: boolean
  autoLoadPrograms: boolean = this.AutoLoadPrograms

  /**
   * When the selected program changes
   */
  @Output()
  SelectedProgramChange: EventEmitter<ChangeSelectedProgramEvent> = new EventEmitter<ChangeSelectedProgramEvent>()


  /**
   * Set whether this widget is disabled or not
   */
  @Input()
  Disabled: boolean
  disabled: boolean = this.Disabled


  editMode: boolean

  /**
   * TODO Layout settings
   */
  appSettings_nativeSelectForTouchDevice

  _programLoadingInProgress: boolean = false

  constructor(private webMidiApiService: WebMidiApiService, private ngZone: NgZone) { }

  onNameChanged(event) {
    const programObject: { nam: string, val: ProgramDump, conv: ProgramDataSysex } = JSON.parse(JSON.stringify(this.programSelected))
    this.sendData(programObject, false)
    this.sendData(programObject, true)
  }

  sendData(programDataObject: { nam: string, val: ProgramDump, conv: ProgramDataSysex }, forWrite: boolean) {
    const programObject: { nam: string, val: ProgramDump, conv: ProgramDataSysex } = JSON.parse(JSON.stringify(programDataObject))
    // assert name is exact 16 characters long
    const nam: number[] = []
    const _nam = ((programObject.nam || '') + '                ').split('').slice(0, 16).join('')
    _nam.split('').map(item => nam.push(item.charCodeAt(0)))
    programObject.val.data.data.name.program_name = _nam as unknown as number[]

    // prepare opcode
    const opcode = forWrite ? SysexOpCodes.WRITE_PROGRAM_DUMP : SysexOpCodes.WRITE_PROGRAM_EDIT
    programObject.val.action = opcode.values
    programObject.val.program = forWrite ? programObject.val.program : null

    const finalDump: number[] = new Line6Parser().export(programObject.val)

    if (this.OutputDevice) {
      WebMidiApiService.sendSysex(finalDump, this.OutputDevice)
    } else {
      this.webMidiApiService.sendSysex(finalDump)
    }
  }

  startLoadingAllPrograms() {
    this._programArray_tmp_no = []
    this._programArray_tmp = []
    this.programArray = []
  }
  addLoadingAllPrograms(progamDump: ProgramDump) {
    if (-1 !== this._programArray_tmp_no.indexOf(progamDump.program)) {

    } else {
      this._programArray_tmp_no.push(progamDump.program)

      const conv = progamDump.data.convert()
      if (this._programArray_tmp) {
        this._programArray_tmp.push({
          nam: conv.name.program_name as unknown as string,
          val: progamDump,
          conv: conv
        })
        if (this._programArray_tmp.length === 124) { this.endLoadingAllPrograms() }
      }
    }
  }

  endLoadingAllPrograms() {
    this._programLoadingInProgress = false
    this.programArray = [].concat(this._programArray_tmp)
    this.programSelected = this.programArray[0]
    this.onChangeProgramSelected(null)
  }

  onChangeProgramSelected(event) {
    // console.log('onChangeProgramSelected', event, this.programSelected, this)
    this.SelectedProgramChange.emit(this.programSelected)
  }

  ngOnInit() {
    this._programLoadingInProgress = false

    if (this.InputDevice) {
      this.bindSysexListener()
    }
    if (this.OutputDevice) {
      // console.log('****** [autoload] this.OutputDevice this.autoLoadingPrograms()', this)
      this.autoLoadingPrograms()
    }
    this.webMidiApiService.inputDevice.subscribe(event => {
      this.clearListener(event.previousValue, this.midiChannel, this.sysexListener)
      if (event.currentValue) {
        this.bindSysexListener()
      }
    })
    this.webMidiApiService.midiChannel.subscribe(event => {
      this.clearListener(this.InputDevice, event.previousValue, this.sysexListener)
      this.midiChannel = event.currentValue
      this.bindSysexListener()
      if (event.currentValue !== event.previousValue && this.webMidiApiService.OutputDevice) {
        // console.log('****** [autoload] this.webMidiApiService.midiChannel this.autoLoadingPrograms()', this, this.webMidiApiService.OutputDevice)
        this.autoLoadingPrograms()
      }
    })
    this.webMidiApiService.outputDevice.subscribe(event => {
      if (event.currentValue !== event.previousValue
        /* prevent from double loading programs, a previous device must have existed */ && event.previousValue) {
        // console.log('****** [autoload] this.webMidiApiService.outputDevice this.autoLoadingPrograms()', this)
        this.autoLoadingPrograms()
      }
    })


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.InputDevice) {
      if (changes.InputDevice.currentValue !== changes.InputDevice.previousValue) {
        this.clearListener(changes.InputDevice.previousValue, this.midiChannel, this.sysexListener)
        this.bindSysexListener()
      }
    }
    if (changes.MIDIChannel) {
      if (changes.MIDIChannel.currentValue !== changes.MIDIChannel.previousValue) {
        this.clearListener(this.InputDevice, changes.MIDIChannel.previousValue, this.sysexListener)
        this.midiChannel = changes.MIDIChannel.currentValue
        this.bindSysexListener()
        // TODO should we re-load the programs here?
      }
    }
    if (changes.styleInline) {
      if (changes.styleInline.currentValue !== changes.styleInline.previousValue) {
        this.inline = changes.styleInline.currentValue
      }
    }
    if (changes.AutoLoadPrograms) {
      if (changes.AutoLoadPrograms.currentValue !== changes.AutoLoadPrograms.previousValue) {
        this.autoLoadPrograms = changes.AutoLoadPrograms.currentValue
      }
    }

    if (changes.Disabled) {
      if (changes.Disabled.currentValue !== changes.Disabled.previousValue) {
        this.disabled = changes.Disabled.currentValue
      }
    }
  }

  ngOnDestroy(): void {
    this.clearListener(this.InputDevice, this.midiChannel, this.sysexListener)
  }

  onChangeMidiChannel(event) {
    this.MIDIChannelChange.emit(this.midiChannel)
  }

  private clearListener(InputDevice, MidiChannel, sysexListener) {
    if (InputDevice) {
      if (sysexListener) {
        WebMidiApiService.removeListener(InputDevice, 'sysex', MidiChannel, this.sysexListener)
      }
    } else {
      this.webMidiApiService.removeListener('sysex', MidiChannel, this.sysexListener)
    }
  }

  private bindSysexListener() {
    const listener = (e: InputEvents['sysex']): void => {
      const deviceInquiryResponse = new Line6UniversalDeviceInquiryParser().parse(e.data)
      if (!deviceInquiryResponse) {
        const dump: ProgramDump = new Line6Parser().parse(e.data)
        if (dump.data) {
          // console.log('bindSysexListener receive program data', dump, this)
          if (dump.program > -1) {
            this.ngZone.run(() => {
              this.addLoadingAllPrograms(dump)
            })
          }
        } else {
          if (!dump.data && !dump.action) {
            console.log('Program stored')
          }
        }
      }
    }
    this.sysexListener = listener
    if (this.InputDevice) {
      WebMidiApiService.addListener<'sysex'>('sysex', this.midiChannel, listener, this.InputDevice)
    } else {
      this.webMidiApiService.addListener<'sysex'>('sysex', this.midiChannel, listener)
    }
  }

  autoLoadingPrograms() {
    if (this._programLoadingInProgress) {
      // console.log('startLoadingAllPrograms', 'program loading already in progress')
      return
    }
    this._programLoadingInProgress = true
    if (this.autoLoadPrograms) { this.sendSysexMessage_DumpProgramAll() }
  }

  sendSysexMessage_UniversalDeviceInquiry() {
    if (this.OutputDevice) {
      WebMidiApiService.sendSysexMessage_UniversalDeviceInquiry(this.midiChannel, this.OutputDevice)
    } else {
      this.webMidiApiService.sendSysexMessage_UniversalDeviceInquiry(this.midiChannel)
    }
  }
  sendSysexMessage_DumpProgram() {
    if (this.OutputDevice) {
      WebMidiApiService.sendSysexMessage_DumpProgram(this.OutputDevice)
    } else {
      this.webMidiApiService.sendSysexMessage_DumpProgram()
    }
  }
  sendSysexMessage_DumpProgramAll() {
    this.startLoadingAllPrograms()
    if (this.OutputDevice) {
      WebMidiApiService.sendSysexMessage_DumpProgramAll(this.OutputDevice)
    } else {
      this.webMidiApiService.sendSysexMessage_DumpProgramAll()
    }
  }
  sendSysexMessage_DumpProgramEdit() {
    if (this.OutputDevice) {
      WebMidiApiService.sendSysexMessage_DumpProgramEdit(this.OutputDevice)
    } else {
      this.webMidiApiService.sendSysexMessage_DumpProgramEdit()
    }
  }

  /**
   * Selects the program by the given product number -1
   * does not trigger any event
   * @param program program number
   */
  selectProgramByNumber(program: number) {
    const p = this.programArray.filter(item => item.val.program == program - 1)
    if ((p || []).length > 0) {
      this.programSelected = p[0]
    } else {
      this.programSelected = null
    }
  }
}

export interface ChangeSelectedProgramEvent {
  nam: string
  val: ProgramDump
  conv: ProgramDataSysex
}