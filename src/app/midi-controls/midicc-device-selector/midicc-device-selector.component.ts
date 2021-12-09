import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, AfterViewInit, AfterViewChecked } from '@angular/core'
import { Output as MidiOutput, Input as MidiInput, WebMidi } from 'webmidi'
import { Subscription } from 'rxjs'
import { WebMidiService } from '../web-midi.service'
import { WebMidiApiService } from '../web-midi-api.service'

@Component({
  selector: 'app-midicc-device-selector',
  templateUrl: './midicc-device-selector.component.html',
  styleUrls: ['./midicc-device-selector.component.scss'],
  host: {
    '[class.hidden_component]': 'hidden'
  }
})
export class MidiccDeviceSelectorComponent implements OnInit, OnChanges {

  outputDevices: { label: string, value: MidiOutput }[] = null
  outputDevice: MidiOutput = null

  inputDevices: { label: string, value: MidiInput }[] = null
  inputDevice: MidiInput = null

  @Output()
  onOutputDeviceChange: EventEmitter<MidiOutput> = new EventEmitter<MidiOutput>()
  @Output()
  onInputDeviceChange: EventEmitter<MidiInput> = new EventEmitter<MidiInput>()
  @Output()
  onMidiChannelChange: EventEmitter<number> = new EventEmitter<number>()

  @Input()
  defaultInputDeviceName: string = 'Line 6 Pocket POD'
  @Input()
  defaultOutputDeviceName: string = 'Line 6 Pocket POD'
  @Input()
  defaultMidiChannel: number = 1
  /**
   * Allow changing MIDI channel
   */
  @Input()
  MIDIChannelEdit: boolean

  /**
   * Hidden
   */
  @Input()
  Hidden: boolean
  hidden: boolean = this.Hidden


  midiChannel: number = this.defaultMidiChannel

  subInit: Subscription

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

  constructor(private webMidiService: WebMidiService, private webMidiApiService: WebMidiApiService) { }

  ngOnInit() {
    this.subInit = this.webMidiService.initWebMIDI().subscribe((webMidiApi: WebMidi) => {
      this.updateDeviceLists(webMidiApi)
    }, (error) => {
      alert('MIDI support is not enabled in this browser')
      console.error('MIDI support is not enabled in this browser', error)
    }, () => {

    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Disabled) {
      if (changes.Disabled.currentValue !== changes.Disabled.previousValue) {
        this.disabled = changes.Disabled.currentValue
      }
    }
    if (changes.Hidden) {
      if (changes.Hidden.currentValue !== changes.Hidden.previousValue) {
        this.hidden = changes.Hidden.currentValue

        /** re-init lists */
        const _i = [].concat(this.inputDevices || [])
        const _o = [].concat(this.outputDevices || [])
        const _i_ = this.inputDevice
        const _o_ = this.outputDevice
        this.inputDevice = null
        this.outputDevice = null
        this.inputDevices = null
        this.outputDevices = null

        this.inputDevice = _i_
        this.outputDevice = _o_
        this.inputDevices = _i
        this.outputDevices = _o

      }
    }

  }

  updateDeviceLists(webMidiApi: WebMidi) {
    const outputDevices = []
    webMidiApi.outputs.map(item => {
      outputDevices.push({ label: item.name, value: item })
    })
    this.outputDevices = outputDevices
    if ((this.outputDevices || []).length)
      this.outputDevice = webMidiApi.getOutputByName(this.defaultOutputDeviceName || this.outputDevices[0].value.name) || this.outputDevices[0].value

    const inputDevices = []
    webMidiApi.inputs.map(item => {
      inputDevices.push({ label: item.name, value: item })
    })
    this.inputDevices = inputDevices
    if ((this.inputDevices || []).length)
      this.inputDevice = webMidiApi.getInputByName(this.defaultInputDeviceName || this.inputDevices[0].value.name) || this.inputDevices[0].value

    this.onChangeInputDevice()
    this.onChangeOutputDevice()
  }

  ngOnDestroy(): void {
    if (this.subInit) {
      this.subInit.unsubscribe()
    }
  }

  onChangeOutputDevice(event?: any) {
    try { this.webMidiApiService.updateOutputDevice(this.outputDevice) } catch (e) { console.error(e) }
    try { this.onOutputDeviceChange.emit(this.outputDevice) } catch (e) { console.error(e) }
  }

  onChangeInputDevice(event?: any) {
    try { this.webMidiApiService.updateInputDevice(this.inputDevice) } catch (e) { console.error(e) }
    try { this.onInputDeviceChange.emit(this.inputDevice) } catch (e) { console.error(e) }
  }

  onChangeMidiChannel(event) {
    try { this.webMidiApiService.updateMidiChannel(this.midiChannel) } catch (e) { console.error(e) }
    try { this.onMidiChannelChange.emit(this.midiChannel) } catch (e) { console.error(e) }
  }
}
