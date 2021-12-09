import { Component, OnInit, Input, OnChanges, SimpleChanges, NgZone, Output, EventEmitter, OnDestroy } from '@angular/core'
import { Output as MidiOutput, Input as MidiInput, InputEvents } from 'webmidi'
import { WebMidiApiService } from '../web-midi-api.service'

@Component({
  selector: 'app-midicc-program',
  templateUrl: './midicc-program.component.html',
  styleUrls: ['./midicc-program.component.scss']
})
export class MidiccProgramComponent implements OnInit, OnChanges, OnDestroy {
  // TODO remove this when implemnted
  bankselect_is_implemented = false
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
   * The value for the MIDI Continous Control
   */
  @Input()
  MIDIValue: number = null
  /**
   * When the program value changes.
   * binding on `(MIDIProgramChange)="..."`
   */
  @Output()
  MIDIProgramChange = new EventEmitter<MidiProgramChangeEvent>(null)

  /**
   * The label to show within this control
   */
  @Input()
  Label: string = 'Program / Bank'

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

  midiProgramNumber: number = this.MIDIValue || 1
  midiBankNumber = 0

  controlChangeListener: any

  /** style */
  /**
   * Don't show card
   */
  @Input()
  styleInline: boolean = false
  inline: boolean = this.styleInline

  /**
   * The name of the icon.
   * Only when `MIDIValue` is set.
   * Displays the icon only and sets the label as tooltip.
   */
  @Input()
  styleIconOnly: string
  iconOnly: string = this.styleIconOnly

  /**
   * Show only as a predifined program toggle.
   * Only when `MIDIValue` is set.
   * This is useful when the guitar tuner is set on a specif program number.
   * e.g on Pocket POD the program number 125 will toggle the guitar tuner.
   */
  @Input()
  styleToggleOnly: boolean = false
  toggleOnly: boolean = this.styleToggleOnly


  @Input()
  MIDIProgramsMax: number = 127
  programsMax: number = this.MIDIProgramsMax

  @Input()
  MIDIProgramsMin: number = 1
  programsMin: number = this.MIDIProgramsMin

  /**
   * Set whether this widget is disabled or not
   */
  @Input()
  Disabled: boolean
  disabled: boolean = this.Disabled

  constructor(private webMidiApiService: WebMidiApiService, private ngZone: NgZone) { }

  ngOnInit() {
    if (this.InputDevice) {
      this.bindProgramChangeListener()
    } else {
      this.webMidiApiService.inputDevice.subscribe(event => {
        this.clearListener(event.previousValue, this.webMidiApiService.MidiChannel, this.controlChangeListener)
        if (event.currentValue)
          this.bindProgramChangeListener()
      })
      this.webMidiApiService.midiChannel.subscribe(event => {
        this.clearListener(this.InputDevice, event.previousValue, this.controlChangeListener)
        this.midiChannel = event.currentValue
        this.bindProgramChangeListener()
      })
    }
  }

  private bindProgramChangeListener() {
    const listener = (e: InputEvents['programchange']) => {
      this.ngZone.run(() => {
        this.midiProgramNumber = e.value
        this.MIDIProgramChange.emit({ program: this.midiProgramNumber })
      })
    }
    this.controlChangeListener = listener
    if (this.InputDevice) {
      WebMidiApiService.addListener<'programchange'>('programchange', this.midiChannel, listener, this.InputDevice)
    } else {
      this.webMidiApiService.addListener<'programchange'>('programchange', this.midiChannel, listener)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.InputDevice) {
      if (changes.InputDevice.currentValue !== changes.InputDevice.previousValue) {
        this.clearListener(changes.InputDevice.previousValue, this.midiChannel, this.controlChangeListener)
        this.bindProgramChangeListener()
      }
    }
    if (changes.MIDIChannel) {
      if (changes.MIDIChannel.currentValue !== changes.MIDIChannel.previousValue) {
        this.clearListener(this.InputDevice, changes.MIDIChannel.previousValue, this.controlChangeListener)
        this.midiChannel = changes.MIDIChannel.currentValue
        this.bindProgramChangeListener()
      }
    }
    // Program
    if (changes.MIDIValue) {
      if (changes.MIDIValue.currentValue !== changes.MIDIValue.previousValue) {
        this.midiProgramNumber = changes.MIDIValue.currentValue
        // console.log('Override Program ', changes.MIDIValue.currentValue, changes.MIDIValue.previousValue)
      }
    }
    if (changes.styleInline) {
      if (changes.styleInline.currentValue !== changes.styleInline.previousValue) {
        this.inline = changes.styleInline.currentValue
      }
    }

    if (changes.styleIconOnly) {
      if (changes.styleIconOnly.currentValue !== changes.styleIconOnly.previousValue) {
        this.iconOnly = changes.styleIconOnly.currentValue
      }
    }
    if (changes.styleToggleOnly) {
      if (changes.styleToggleOnly.currentValue !== changes.styleToggleOnly.previousValue) {
        this.toggleOnly = changes.styleToggleOnly.currentValue
      }
    }

    if (changes.MIDIProgramsMax) {
      if (changes.MIDIProgramsMax.currentValue !== changes.MIDIProgramsMax.previousValue) {
        this.programsMax = changes.MIDIProgramsMax.currentValue
      }
    }
    if (changes.MIDIProgramsMin) {
      if (changes.MIDIProgramsMin.currentValue !== changes.MIDIProgramsMin.previousValue) {
        this.programsMin = changes.MIDIProgramsMin.currentValue
      }
    }

    if (changes.Disabled) {
      if (changes.Disabled.currentValue !== changes.Disabled.previousValue) {
        this.disabled = changes.Disabled.currentValue
      }
    }


  }

  ngOnDestroy(): void {
    this.clearListener(this.InputDevice, this.midiChannel, this.controlChangeListener)
  }

  private clearListener(InputDevice, MidiChannel, controlChangeListener) {
    if (InputDevice) {
      if (controlChangeListener) {
        WebMidiApiService.removeListener(InputDevice, 'controlchange', MidiChannel, this.controlChangeListener)
      }
    } else {
      this.webMidiApiService.removeListener('controlchange', MidiChannel, this.controlChangeListener)
    }
  }

  sendMidiProgrammChange(event, midiProgramNumber, midiChannel) {
    if (this.OutputDevice) {
      WebMidiApiService.sendProgramChange(midiProgramNumber, midiChannel, this.OutputDevice)
    } else {
      this.webMidiApiService.sendProgramChange(midiProgramNumber)
    }
    this.MIDIProgramChange.emit({ program: this.midiProgramNumber })
  }

  onChangeProgramUp(event) {
    const tmp = this.midiProgramNumber + 1
    this.midiProgramNumber = tmp <= this.programsMax ? tmp : this.programsMin
    this.sendMidiProgrammChange(event, this.midiProgramNumber, this.midiChannel)
  }

  onChangeProgramDown(event) {
    const tmp = this.midiProgramNumber - 1
    this.midiProgramNumber = tmp >= this.programsMin ? tmp : this.programsMax
    this.sendMidiProgrammChange(event, this.midiProgramNumber, this.midiChannel)
  }

  onChangeProgramInput(event) {
    if (this.midiProgramNumber >= this.programsMin && this.midiProgramNumber <= this.programsMax) {
      this.sendMidiProgrammChange(event, this.midiProgramNumber, this.midiChannel)
    }
  }

  onChangeProgramFromToggle() {
    this.sendMidiProgrammChange(event, this.midiProgramNumber, this.midiChannel)
  }

  onChangeBankUp(event) {
    this.midiBankNumber = this.midiBankNumber + 1
    this.midiBankNumber = this.midiBankNumber <= 4 ? this.midiBankNumber : 0
  }

  onChangeBankDown(event) {
    this.midiBankNumber = this.midiBankNumber - 1
    this.midiBankNumber = this.midiBankNumber >= 0 ? this.midiBankNumber : 4
  }

  onChangeBankInput(event) {
    this.sendMidiBankChange(event, this.midiBankNumber, this.midiChannel)
  }

  sendMidiBankChange(event: any, midiBankNumber: number, midiChannel: number) {
    /**
     * Bank change requires sending a MIDI message for MSB (Most Significant Bit) and LSB (Least Significant Bit) each.<br/>
     * MSB has the CC `00` while LSB has the CC `32`
     * 
     * Example:
     * 
     * Bank A 000 000
     * Bank B 000 001
     * Bank C 000 002
     * Bank D 000 003
     * Bank E 000 004
     * Bank F 000 005
     * Bank G(0) 121 000
     * Bank G(1) 121 001
     * Bank G(2) 121 002
     * Bank G(3) 121 003
     * 
     * Then selecting Bank D should send 2 MIDI messages:
     * CC 00 "000"
     * CC 32 "003"
     * 
     * See also: https://www.sweetwater.com/sweetcare/articles/6-what-msb-lsb-refer-for-changing-banks-andprograms/
     */
    // TODO not implemented yet
    console.error('Bankselect ist not yet implemented!')
    const msb = 0
    const lsb = 0
    if (this.OutputDevice) {
      WebMidiApiService.sendControlChange(0, msb, midiChannel, this.OutputDevice)
      WebMidiApiService.sendControlChange(32, lsb, midiChannel, this.OutputDevice)
    } else {
      this.webMidiApiService.sendControlChange(0, msb)
      this.webMidiApiService.sendControlChange(32, lsb)
    }
  }

  onChangeMidiChannel(event) {
    this.MIDIChannelChange.emit(this.midiChannel)
  }
  /**
   * Will not trigger any event except midi program change
   * @param programNumber program number
   */
  updateProgramByProgramNumber(programNumber: number) {
    this.midiProgramNumber = programNumber
    this.onChangeProgramInput(event)
  }
}


export interface MidiProgramChangeEvent {
  program: number
}