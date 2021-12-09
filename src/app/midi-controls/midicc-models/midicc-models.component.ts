import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, NgZone } from '@angular/core'
import { Output as MidiOutput, Input as MidiInput, InputEvents } from 'webmidi'
import { WebMidiApiService } from '../web-midi-api.service'

@Component({
  selector: 'app-midicc-models',
  templateUrl: './midicc-models.component.html',
  styleUrls: ['./midicc-models.component.scss']
})
export class MidiccModelsComponent implements OnInit, OnChanges {

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
   * When the midi control value changes.
   * binding on `(MIDIControlChange)="..."`
   */
  @Output()
  MIDIControlChange = new EventEmitter<MidiControlChangeEvent>(null)

  /**
   * The label to show within this control
   */
  @Input()
  Label: string

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

  ModelTables = Constants.MIDI_Tables
  ModelTablesFastMap = {}
  ModelTablesSelectedItem = {}

  controlChangeListener: any

  /** style */
  /**
   * Don't show card
   */
  @Input()
  styleInline: boolean = false
  inline: boolean = this.styleInline

  /**
   * Set whether this widget is disabled or not
   */
  @Input()
  Disabled: boolean
  disabled: boolean = this.Disabled


  /**
   * TODO Layout settings
   */
  appSettings_nativeSelectForTouchDevice

  constructor(private webMidiApiService: WebMidiApiService, private ngZone: NgZone) {
    this.ModelTables.map(item => {
      const _item = {}
      item.values.map(i => _item[i.value] = i)
      this.ModelTablesFastMap[item.cc] = _item
    })
  }

  ngOnInit() {
    if (this.InputDevice) {
      this.bindControlChangeListener()
    }
    this.webMidiApiService.inputDevice.subscribe(event => {
      this.clearListener(event.previousValue, this.midiChannel, this.controlChangeListener)
      if (event.currentValue)
        this.bindControlChangeListener()
    })
    this.webMidiApiService.midiChannel.subscribe(event => {
      this.clearListener(this.InputDevice, event.previousValue, this.controlChangeListener)
      this.midiChannel = event.currentValue
      this.bindControlChangeListener()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.InputDevice) {
      if (changes.InputDevice.currentValue !== changes.InputDevice.previousValue) {
        this.clearListener(changes.InputDevice.previousValue, this.midiChannel, this.controlChangeListener)
        this.bindControlChangeListener()
      }
    }
    if (changes.MIDIChannel) {
      if (changes.MIDIChannel.currentValue !== changes.MIDIChannel.previousValue) {
        this.clearListener(this.InputDevice, changes.MIDIChannel.previousValue, this.controlChangeListener)
        this.midiChannel = changes.MIDIChannel.currentValue
        this.bindControlChangeListener()
      }
    }

    if (changes.styleInline) {
      if (changes.styleInline.currentValue !== changes.styleInline.previousValue) {
        this.inline = changes.styleInline.currentValue
      }
    }

    if (changes.Disabled) {
      if (changes.Disabled.currentValue !== changes.Disabled.previousValue) {
        this.disabled = changes.Disabled.currentValue
      }
    }

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

  private bindControlChangeListener() {
    const listener = (e: InputEvents['controlchange']) => {
      this.ngZone.run(() => {
        const midiChannel = e.channel
        const modelTableCC = (e.controller || {})['number']
        const midiCCValue = e.value
        this.selectByMidiCCAndValue(modelTableCC, midiCCValue);
      })
    }
    this.controlChangeListener = listener
    if (this.InputDevice) {
      WebMidiApiService.addListener<'controlchange'>('controlchange', this.midiChannel, listener, this.InputDevice)
    } else {
      this.webMidiApiService.addListener<'controlchange'>('controlchange', this.midiChannel, listener)
    }
  }

  selectByMidiCCAndValue(modelTableCC: number, midiCCValue: number | number[]) {
    if (this.ModelTablesFastMap[modelTableCC]) {
      const _midiValue: number = Array.isArray(midiCCValue) ? midiCCValue[0] || 0 : midiCCValue as number
      this.ModelTablesSelectedItem[modelTableCC] = this.ModelTablesFastMap[modelTableCC][_midiValue]
    }
  }

  sendControlChange(event: MidiControlChangeEvent) {
    if (this.OutputDevice) {
      WebMidiApiService.sendControlChange(event.cc, event.value, this.midiChannel, this.OutputDevice)
    } else {
      this.webMidiApiService.sendControlChange(event.cc, event.value)
    }
  }

  onChangeControl(event, cc, ccLabel) {
    const ccEvent: MidiControlChangeEvent = {
      cc: cc,
      ccLabel: ccLabel,
      value: event.value.value,
      valueLabel: event.value.label
    }
    this.sendControlChange(ccEvent)
    this.MIDIControlChange.emit(ccEvent)
  }

  onChangeMidiChannel(event) {
    this.MIDIChannelChange.emit(this.midiChannel)
  }
}

export class Constants {
  static MIDI_Effects = {
    cc: 19,
    label: 'Effect',
    name: 'Effect Models',
    values: [
      { value: 0, label: 'Chorus2' },
      { value: 1, label: 'Flanger1' },
      { value: 2, label: 'Rotary' },
      { value: 3, label: 'Flanger2' },
      { value: 4, label: 'Delay/Chorus1' },
      { value: 5, label: 'Delay/Tremolo' },
      { value: 6, label: 'Delay' },
      { value: 7, label: 'Delay/Comp' },
      { value: 8, label: 'Chorus1' },
      { value: 9, label: 'Tremolo' },
      { value: 10, label: 'Bypass' },
      { value: 11, label: 'Compressor' },
      { value: 12, label: 'Delay/Chorus2' },
      { value: 13, label: 'Delay/Flanger1' },
      { value: 14, label: 'Delay/Swell' },
      { value: 15, label: 'Delay/Flanger2' }
    ]
  }

  static MIDI_Cabs = {
    cc: 71,
    label: 'Cab',
    name: 'Cab Models',
    values: [
      { value: 0, label: '1x 8 ’60 Fender Tweed Champ' },
      { value: 1, label: '1x12 ’52 Fender Tweed Deluxe' },
      { value: 2, label: '1x12 ’60 Vox AC15' },
      { value: 3, label: '1x12 ’64 Fender Blackface Deluxe 4 1x12 ’98 Line 6 Flextone' },
      { value: 5, label: '2x12 ’65 Fender Blackface Twin 6 2x12 ’67 VOX AC30' },
      { value: 7, label: '2x12 ’95 Matchless Chieftain' },
      { value: 8, label: '2x12 ’98 Pod custom 2x12' },
      { value: 9, label: '4x10 ’59 Fender Bassman' },
      { value: 10, label: '4x10 ’98 Pod custom 4x10 cab' },
      { value: 11, label: '4x12 ’96 Marshall with V30s' },
      { value: 12, label: '4x12 ’78 Marshall with 70s' },
      { value: 13, label: '4x12 ’97 Marshall Basketweave with Greenbacks' },
      { value: 14, label: '4x12 ’98 Pod custom 4x12' },
      { value: 15, label: 'No Cabinet' }]
  }

  static MIDI_Amps = {
    cc: 12,
    label: 'Amp',
    name: 'Amp Models',
    values: [
      { value: 0, label: 'Tube Preamp' },
      { value: 1, label: 'Line 6 Clean' },
      { value: 2, label: 'Line 6 Crunch' },
      { value: 3, label: 'Line 6 Drive' },
      { value: 4, label: 'Line 6 Layer' },
      { value: 5, label: 'Small Tweed' },
      { value: 6, label: 'Tweed Blues' },
      { value: 7, label: 'Black Panel' },
      { value: 8, label: 'Modern Class A' },
      { value: 9, label: 'Brit Class A' },
      { value: 10, label: 'Brit Blues' },
      { value: 11, label: 'Brit Classic' },
      { value: 12, label: 'Brit Hi Gain' },
      { value: 13, label: 'Treadplate' },
      { value: 14, label: 'Modern Hi Gain' },
      { value: 15, label: 'Fuzz Box' },
      { value: 16, label: 'Jazz Clean' },
      { value: 17, label: 'Boutique #1' },
      { value: 18, label: 'Boutique #2' },
      { value: 19, label: 'Brit Class A #2' },
      { value: 20, label: 'Brit Class A #3' },
      { value: 21, label: 'Small Tweed #2' },
      { value: 22, label: 'Black Panel #2' },
      { value: 23, label: 'Boutique #3' },
      { value: 24, label: 'California Crunch #1' },
      { value: 25, label: 'California Crunch #2' },
      { value: 26, label: 'Treadplate #2' },
      { value: 27, label: 'Modern Hi Gain #2' },
      { value: 28, label: 'Line 6 Twang' },
      { value: 29, label: 'Line 6 Crunch #2' },
      { value: 30, label: 'Line 6 Blues' },
      { value: 31, label: 'Line 6 INSANE' }
    ]
  }

  static MIDI_Tables = [Constants.MIDI_Amps, Constants.MIDI_Cabs, Constants.MIDI_Effects]

}

export interface MidiControlChangeEvent {
  /** 
   * the name of the model type.
   * e.g. Amp, Cab, Effect
   */
  ccLabel?: string
  /**
   * the MIDI CC number
   */
  cc: number
  /**
   * The name of the selected item for `value`
   */
  valueLabel?: string
  /**
   * The MIDI value
   */
  value: number
}