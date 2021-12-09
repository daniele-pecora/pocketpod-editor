import { Component, OnInit, Input, SimpleChanges, NgZone, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core'
import { Output as MidiOutput, Input as MidiInput, InputEvents } from 'webmidi'
import { WebMidiApiService } from '../web-midi-api.service'

@Component({
  selector: 'app-midicc-control',
  templateUrl: './midicc-control.component.html',
  styleUrls: ['./midicc-control.component.scss'],
  host: {
    '[class.midi-control-inline]': 'inline',
    '[class.midi-control-disabled]': 'disabled',
    '[class.midi-control-horizontal]': '"horizontalSlider"===styleType',
    '[class.midi-control-vertical]': '"verticalSlider"===styleType',
    '[class.midi-control-round]': '"roundSlider"===styleType',
    '[class.midi-control-inputOnly]': '"inputOnly"===styleType',
    '[class.midi-control-radioGroup]': '"radioGroup"===styleType',
    '[class.midi-control-select]': '"select"===styleType'
  },
})
export class MidiccControlComponent implements OnInit, OnChanges, OnDestroy {

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
   * The number of the MIDI Continous Control
   */
  @Input()
  MIDICC: number = null
  /**
   * The value for the MIDI Continous Control
   */
  @Input()
  MIDIValue: number = null
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
  Label: string = `MIDI Continous Control ${this.MIDICC}`

  /**
   * The MIDI Continous Control to enable or disable this control.
   * Since not every control setting has an on/off switch the default is `null`.
   */
  @Input()
  MIDICCActivate: number = null
  /**
   * The number value that represents the enabled state of this control.
   * Default is `127`
   */
  @Input()
  MIDICCActivateEnable: number = 127
  /**
   * The number value that represents the disabled state of this control.
   * Default is `0`
   */
  @Input()
  MIDICCActivateDisable: number = 0
  /**
   * The label for the switch toggle
   */
  @Input()
  MIDICCActivateLabel: string

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

  midiChannel = this.MIDIChannel || 0

  midiControlSlider_value: number = this.MIDICC || 0
  get midiCCLabel() { return (WebMidiApiService.MIDICC_LABLES.byCC(this.midiControlSlider_value)||{desc:''}).desc }
  get midiCCLabelShort() { return this.midiCCLabel.split('(')[0].replace('[Channel Mode Message] ','CMM ')}

  midiValueSlider_value: number = null

  activeCC: number = null
  activeCCEnable: number = this.MIDICCActivateEnable
  activeCCDisable: number = this.MIDICCActivateDisable

  activeState: boolean = this.calculateActiveState(this.midiValueSlider_value)

  controlChangeListener: any


  /**
   * Emitts value changes in real time (Slider etc.)
   */
  @Input()
  RealTimeChanges: boolean = true /** not sure if real time should be default, but for now... */
  realTimeChanges = this.RealTimeChanges

  /** style */
  /**
   * Don't show card
   */
  @Input()
  styleInline: boolean = false
  inline: boolean = this.styleInline
  /**
   * Display all slider vertical
   */
  @Input()
  styleVertical: boolean = false
  vertical: boolean = this.styleVertical
  /**
   * Display all slider as round slider
   */
  @Input()
  styleRound: boolean = true
  round: boolean = this.styleRound
  /**
   * Display no slider but text only
   */
  @Input()
  styleInputOnly: boolean = true
  inputOnly: boolean = this.styleInputOnly

  /**
   * User radio group for pre-defined values instead of dropdown
   */
  @Input()
  styleRadioPredefinedValues: boolean
  radioPredefinedValues = this.styleRadioPredefinedValues

  /**
   * Any user defined note
   */
  @Input()
  Note: string


  @Input()
  MIDIPredefinedValues: MidiPredefinedValue[]
  midiPredefinedValues = this.MIDIPredefinedValues


  /**
   * Set whether this widget is disabled or not
   */
  @Input()
  Disabled: boolean
  disabled: boolean = this.Disabled

  /**
   * Automation duration in milliseconds to reach min and max
   */
  @Input()
  MIDIAutoTime: number = 0 // default no automation
  autoTime: number = this.MIDIAutoTime
  /**
   * Automation min value
   */
  @Input()
  MIDIAutoMinVal = 0 // default value 0
  autoMinVal: number = this.MIDIAutoMinVal
  /**
   * Automation max value
   */
  @Input()
  MIDIAutoMaxVal = 127 // default value 127
  autoMaxVal: number = this.MIDIAutoMaxVal
  /**
   * Automation curve on how the way is between the min and max value
   */
  @Input()
  MIDIAutoCurve: MidiControlAutoCurve // not supported yet
  autoCurve: MidiControlAutoCurve = this.MIDIAutoCurve

  @Input()
  MIDIAutoLabel: string
  autoLabel: string = this.MIDIAutoLabel || 'Automation'

  autoLoop: {
    timeout: any, // the complete time for the automation
    valueStep: number, // the amout to increase the value
    counter: number, // the current step counter
    curve: number[], // the timeout of every step
    backward?: boolean // current direction can be backward or forward (forward is default)
  }

  autoActiveState: boolean

  /**
   * Show the handle to drag this card.
   * Only when not 'inline'
   */
  @Input()
  ShowDragHandle: boolean
  showDragHandle: boolean = this.ShowDragHandle

  //

  color = 'primary'

  /**
   * TODO Layout settings
   */
  appSettings_nativeSelectForTouchDevice


  get styleType() {
    // [class.midi-control-select]="!styleRadioPredefinedValues && midiPredefinedValues"
    if (!this.styleRadioPredefinedValues && this.midiPredefinedValues) {
      return 'select'
    }
    // [class.midi-control-radioGroup]="styleRadioPredefinedValues && midiPredefinedValues"
    else if (this.styleRadioPredefinedValues && this.midiPredefinedValues) {
      return 'radioGroup'
    }
    // [class.midi-control-inputOnly]="inputOnly && !midiPredefinedValues"
    else if (this.inputOnly && !this.midiPredefinedValues) {
      return 'inputOnly'
    }
    // [class.midi-control-round]="round && !inputOnly && !midiPredefinedValues"
    else if (this.round && !this.inputOnly && !this.midiPredefinedValues) {
      return 'roundSlider'
    }
    // [class.midi-control-vertical]="vertical && !round && !midiPredefinedValues"
    else if (this.vertical && !this.round && !this.midiPredefinedValues) {
      return 'verticalSlider'
    }
    // [class.midi-control-horizontal]="!vertical && !round && !midiPredefinedValues"
    else if (!this.vertical && !this.round && !this.midiPredefinedValues) {
      return 'horizontalSlider'
    }
  }

  public get activated() {
    return this.activeState
  }

  constructor(private webMidiApiService: WebMidiApiService, private ngZone: NgZone) { }

  ngOnInit() {
    if (this.InputDevice) {
      this.bindControlChangeListener()
    }
    this.webMidiApiService.inputDevice.subscribe(event => {
      if (this.midiChannel) {
        this.clearListener(event.previousValue, this.midiChannel, this.controlChangeListener)
        if (event.currentValue)
          this.bindControlChangeListener()
      }
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
    if (changes.MIDICC) {
      if (changes.MIDICC.currentValue !== changes.MIDICC.previousValue) {
        this.midiControlSlider_value = changes.MIDICC.currentValue
      }
    }
    if (changes.MIDIValue) {
      if (changes.MIDIValue.currentValue !== changes.MIDIValue.previousValue) {
        this.midiValueSlider_value = changes.MIDIValue.currentValue
        this.activeState = this.calculateActiveState(this.midiValueSlider_value)
      }
    }
    if (changes.MIDICCActivate) {
      if (changes.MIDICCActivate.currentValue !== changes.MIDICCActivate.previousValue) {
        this.activeCC = changes.MIDICCActivate.currentValue
      }
    }
    if (changes.MIDICCActivateEnable) {
      if (changes.MIDICCActivateEnable.currentValue !== changes.MIDICCActivateEnable.previousValue) {
        this.activeCCEnable = changes.MIDICCActivateEnable.currentValue
        this.activeState = this.calculateActiveState(this.midiValueSlider_value)
      }
    }
    if (changes.MIDICCActivateDisable) {
      if (changes.MIDICCActivateDisable.currentValue !== changes.MIDICCActivateDisable.previousValue) {
        this.activeCCDisable = changes.MIDICCActivateDisable.currentValue
        this.activeState = this.calculateActiveState(this.midiValueSlider_value)
      }
    }
    if (changes.styleVertical) {
      if (changes.styleVertical.currentValue !== changes.styleVertical.previousValue) {
        this.vertical = changes.styleVertical.currentValue
      }
    }
    if (changes.styleInline) {
      if (changes.styleInline.currentValue !== changes.styleInline.previousValue) {
        this.inline = changes.styleInline.currentValue
      }
    }

    if (changes.MIDIChannel) {
      if (changes.MIDIChannel.currentValue !== changes.MIDIChannel.previousValue) {
        this.clearListener(this.InputDevice, changes.MIDIChannel.previousValue, this.controlChangeListener)
        this.midiChannel = changes.MIDIChannel.currentValue
        this.bindControlChangeListener()
      }
    }

    if (changes.MIDIRealTimeChanges) {
      if (changes.MIDIRealTimeChanges.currentValue !== changes.MIDIRealTimeChanges.previousValue) {
        this.realTimeChanges = changes.MIDIRealTimeChanges.currentValue
      }
    }

    if (changes.MIDIPredefinedValues) {
      if (changes.MIDIPredefinedValues.currentValue !== changes.MIDIPredefinedValues.previousValue) {
        this.midiPredefinedValues = changes.MIDIPredefinedValues.currentValue
        // set default value
        if (!this.midiValueSlider_value && this.midiValueSlider_value !== 0) {
          this.midiPredefinedValues.map(item => { if (item.default) { this.midiValueSlider_value = item.value } })
        }
      }
    }

    if (changes.Disabled) {
      if (changes.Disabled.currentValue !== changes.Disabled.previousValue) {
        this.disabled = changes.Disabled.currentValue
      }
    }

    if (changes.styleRound) {
      if (changes.styleRound.currentValue !== changes.styleRound.previousValue) {
        this.round = changes.styleRound.currentValue
      }
    }

    if (changes.styleInputOnly) {
      if (changes.styleInputOnly.currentValue !== changes.styleInputOnly.previousValue) {
        this.inputOnly = changes.styleInputOnly.currentValue
      }
    }

    if (changes.styleRadioPredefinedValues) {
      if (changes.styleRadioPredefinedValues.currentValue !== changes.styleRadioPredefinedValues.previousValue) {
        this.radioPredefinedValues = changes.styleRadioPredefinedValues.currentValue
      }
    }

    let updateAutoLoop
    if (changes.MIDIAutoTime) {
      if (changes.MIDIAutoTime.currentValue !== changes.MIDIAutoTime.previousValue) {
        this.autoTime = changes.MIDIAutoTime.currentValue
        updateAutoLoop = true
      }
    }
    if (changes.MIDIAutoMinVal) {
      if (changes.MIDIAutoMinVal.currentValue !== changes.MIDIAutoMinVal.previousValue) {
        this.autoMinVal = changes.MIDIAutoMinVal.currentValue
        updateAutoLoop = true
      }
    }
    if (changes.MIDIAutoMaxVal) {
      if (changes.MIDIAutoMaxVal.currentValue !== changes.MIDIAutoMaxVal.previousValue) {
        this.autoMaxVal = changes.MIDIAutoMaxVal.currentValue
        updateAutoLoop = true
      }
    }
    if (changes.MIDIAutoCurve) {
      if (changes.MIDIAutoCurve.currentValue !== changes.MIDIAutoCurve.previousValue) {
        this.autoCurve = changes.MIDIAutoCurve.currentValue
        updateAutoLoop = true
      }
    }
    if (changes.MIDIAutoLabel) {
      if (changes.MIDIAutoLabel.currentValue !== changes.MIDIAutoLabel.previousValue) {
        this.autoLabel = changes.MIDIAutoLabel.currentValue
      }
    }

    if (changes.ShowDragHandle) {
      if (changes.ShowDragHandle.currentValue !== changes.ShowDragHandle.previousValue) {
        this.showDragHandle = changes.ShowDragHandle.currentValue
      }
    }

    if (updateAutoLoop) {
      this.updateAutoLoopState(updateAutoLoop)
    }
  }

  private updateAutoLoopState(updateOnChange?: boolean) {
    if (!this.activeState) {
      this.autoActiveState = false
    }
    if (updateOnChange || !this.activeState || this.disabled) {
      this.stopAndResetAutoLoop()
      if (this.autoActiveState && this.autoTime > 0) {
        this.startAutoLoop()
      }
    }
  }

  private bindControlChangeListener() {
    const listener = (e: InputEvents['controlchange']) => {
      this.ngZone.run(() => {
        const midiChannel = e.channel
        const midiCC = (e.controller || {})['number']
        const midiCCValue = e.value

        const sameCC = this.midiControlSlider_value == midiCC
        const sameChannel = this.midiChannel == midiChannel
        const sameActiveCC = this.activeCC == midiCC
        if (sameChannel) {
          if ((sameCC || sameActiveCC) && (this.activeCC === this.midiControlSlider_value)) {
            this.midiValueSlider_value = midiCCValue
            this.activeState = this.calculateActiveState(midiCCValue)//midiCCValue === Number.parseInt(`${this.activeCCDisable}`) ? false : true
          } else if (sameCC) {
            this.midiValueSlider_value = midiCCValue
          } else if (sameActiveCC) {
            this.activeState = this.calculateActiveState(midiCCValue)//midiCCValue === Number.parseInt(`${this.activeCCDisable}`) ? false : true
          }
        }
      })
    }
    this.controlChangeListener = listener
    if (this.InputDevice) {
      WebMidiApiService.addListener<'controlchange'>('controlchange', this.midiChannel, listener, this.InputDevice)
    } else {
      this.webMidiApiService.addListener<'controlchange'>('controlchange', this.midiChannel, listener)
    }
  }

  private calculateActiveState(midiValue: number): boolean {
    return midiValue === Number.parseInt(`${this.activeCCDisable}`) ? false : true
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

  _emitEvent(midiValue: number) {
    const eventObject: MidiControlChangeEvent = {
      cc: this.midiControlSlider_value,
      value: midiValue
    }
    if (this.midiPredefinedValues) {
      this.midiPredefinedValues.map(item => {
        if (item.value === midiValue) {
          eventObject.valueLabel = item.label
        }
        return item
      })
    }
    this.MIDIControlChange.emit(eventObject)
  }
  sendControlChange(midiValue) {
    this._emitEvent(midiValue)
    if (this.OutputDevice) {
      WebMidiApiService.sendControlChange(Number.parseInt(`${this.midiControlSlider_value}`), midiValue, this.midiChannel, this.OutputDevice)
    } else {
      this.webMidiApiService.sendControlChange(Number.parseInt(`${this.midiControlSlider_value}`), midiValue)
    }
  }

  onSliderInputChange(event) {
    this.sendControlChange(event.value)
  }

  onSliderMoved(event) {
    if (this.realTimeChanges)
      this.sendControlChange(event.value)
  }


  handleChangeActiveStatus(event) {
    this.updateAutoLoopState()
    if (null != this.activeCC) {
      if (this.OutputDevice) {
        WebMidiApiService.sendControlChange(Number.parseInt(`${this.activeCC}`), (this.activeState ? this.activeCCEnable : this.activeCCDisable), this.midiChannel, this.OutputDevice)
      } else {
        this.webMidiApiService.sendControlChange(Number.parseInt(`${this.activeCC}`), (this.activeState ? this.activeCCEnable : this.activeCCDisable))
      }
    }
  }

  onChangeMidiChannel(event) {
    /**
     * keep in mind that when this is bound on `(onNgModelChange)` 
     * it will fired for `(input)` and `(change)` events
     */
    this.MIDIChannelChange.emit(this.midiChannel)
  }

  /**
   * Automation
   */
  handleChangeAutoActiveStatus($event) {
    if (this.autoActiveState) {
      this.startAutoLoop()
    } else {
      this.stopAndResetAutoLoop()
    }
  }
  clearAutomationTimeout() {
    if (this.autoLoop && this.autoLoop.timeout) {
      clearTimeout(this.autoLoop.timeout)
      this.autoLoop.timeout = null
    }
  }
  stopAndResetAutoLoop() {
    this.autoLoop = this.autoLoop || {
      timeout: null,
      valueStep: 11,
      counter: -1,
      curve: [],
      backward: false
    }
    this.clearAutomationTimeout()
    this.autoLoop = {
      timeout: null,
      valueStep: 11,
      counter: -1,
      curve: [],
      backward: false
    }
  }

  startAutoLoop() {
    this.stopAndResetAutoLoop()
    this.createCurveLinear()
    this.runAutoLoop(true)
  }

  private createCurveLinear() {
    const trackStep = this.autoLoop.valueStep
    const track = this.autoMaxVal - this.autoMinVal
    const step = this.autoTime / (track / trackStep)
    const stepsTotal = this.autoTime / step
    this.autoLoop.curve = []
    // forwards
    for (let i = 0; i < stepsTotal; i++) {
      this.autoLoop.curve.push(step)
    }
  }

  runAutoLoop(isFirst?: boolean) {

    this.clearAutomationTimeout()

    let nexValue = this.midiValueSlider_value

    let currentStepTimeout = 0
    if (!isFirst) {
      let vindex = this.autoLoop.counter % this.autoLoop.curve.length
      let bindex = (this.autoLoop.curve.length - (this.autoLoop.counter % this.autoLoop.curve.length)) - 1
      let index = vindex
      if (this.autoLoop.backward) {
        index = bindex
      }
      if (this.autoLoop.backward) {
        nexValue = this.midiValueSlider_value - this.autoLoop.valueStep
        if (this.autoMinVal > nexValue) {
          nexValue = this.autoMinVal
        }
      } else {
        nexValue = this.midiValueSlider_value + this.autoLoop.valueStep
        if (this.autoMaxVal < nexValue) {
          nexValue = this.autoMaxVal
        }
      }
      // console.log('nexValue', nexValue)

      // check if next index would be a direction changer
      if (vindex === this.autoLoop.curve.length - 1) {
        this.autoLoop.backward = !this.autoLoop.backward
      }
      currentStepTimeout = this.autoLoop.curve[index]

      // console.log('####### runAutoLoop', 'isFirst', isFirst, 'index', index, 'currentStepTimeout', currentStepTimeout, this.autoLoop)
    } else {
      this.midiValueSlider_value = this.autoMinVal
    }

    this.autoLoop.timeout = setTimeout(() => {
      this.midiValueSlider_value = nexValue
      this.sendControlChange(this.midiValueSlider_value)
      this.autoLoop.counter++
      this.runAutoLoop()
    }, currentStepTimeout)
  }
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

export interface MidiPredefinedValue {
  label: string
  value: number
  default?: boolean
}

export enum MidiControlAutoCurve {
  sine = 'sine',
  saw = 'saw'
}