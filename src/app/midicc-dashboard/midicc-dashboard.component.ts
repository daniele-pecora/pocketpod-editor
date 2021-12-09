import { Component, OnInit, Input, HostBinding, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Output as MidiOutput, Input as MidiInput } from 'webmidi';
import { ChangeSelectedProgramEvent } from '../midi-controls';
import { ProgramDataSysex } from '../midi-controls';
import { AppGlobalSettingsService, SliderLayoutType } from '../app-global-settings.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-midicc-dashboard',
  templateUrl: './midicc-dashboard.component.html',
  styleUrls: ['./midicc-dashboard.component.scss'],
  host: {
    '[class.show_as_columns]': '__useColumns'
  },
})
export class MidiccDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  OutputDevice: MidiOutput
  InputDevice: MidiInput
  midiChannel: number

  currentProgram: ChangeSelectedProgramEvent = Object.assign({}, EMPTY_PROG)

  _found_OutputDevice: MidiOutput
  _found_InputDevice: MidiInput

  /** don't show the device selector for now */
  hideDeviceSelector: boolean = true


  /** Layout settings */
  get __showAllControlsDisabled() { return this.dragEnabled }
  get __debug() { return this.appSettings.debug }
  get __useColumns() { return this.appSettings.useColumns }
  get __useRadioGroupInsteadOfDropdown() { return this.appSettings.useRadioGroupInsteadOfDropdown }
  get __useVerticalSlider() { return this.appSettings.sliderLayoutType === SliderLayoutType.vertical }
  get __useRoundSlider() { return this.appSettings.sliderLayoutType === SliderLayoutType.round }
  get __inputOnly() { return this.appSettings.sliderLayoutType === SliderLayoutType.text }

  get dragulaGroup(): string { return this.appSettings.dragAndDropEnabled ? 'MIDI_CONTROLS' : null }
  get dragEnabled(): boolean { return this.appSettings.dragAndDropEnabled }

  get controls_drag_order(): string[] { return this.appSettings.controlsOrder }
  set controls_drag_order(value: string[]) { this.appSettings.controlsOrder = value }


  subs = new Subscription()

  @ViewChild('program_select', { static: false })
  program_select
  @ViewChild('program_models', { static: false })
  program_models

  constructor(public appSettings: AppGlobalSettingsService, private dragulaService: DragulaService) {
    this.updateDragGroup()
  }

  updateDragGroup() {
    this.dragulaService.createGroup(this.dragulaGroup, {
      moves: (el, container, handle) => {
        return handle.classList.contains('drag_handle')
      }
    })
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
  }

  dragulaModelChange(event) {
    /**
     * Not a single item may be missing from the dragulaModel
     * or nothing will ever work!
     */
    this.controls_drag_order = event
    console.log('dragulaModelChange', event)
  }

  onToggleDebugMode(event) {

  }

  onMidiChannelChange(event) {

  }
  // TODO listen when 'this.appSettings.useGlobalServiceDevices' changes, see also SwitchToggle in `midicc-dashboard-settings.component.html`
  handleChangeUseGlobalServiceDevices(event, deviceSelectorComponent) {
    this._found_OutputDevice = deviceSelectorComponent['outputDevice']
    this._found_InputDevice = deviceSelectorComponent['inputDevice']

    if (!this.appSettings.useGlobalServiceDevices) {
      this.OutputDevice = this._found_OutputDevice
      this.InputDevice = this._found_InputDevice
    } else {
      this.OutputDevice = null
      this.InputDevice = null
    }
  }

  inputDeviceChange(event) {
    this._found_InputDevice = event
    if (!this.appSettings.useGlobalServiceDevices) {
      this.InputDevice = this._found_InputDevice
    }
  }

  outputDeviceChange(event) {
    this._found_OutputDevice = event
    if (!this.appSettings.useGlobalServiceDevices) {
      this.OutputDevice = this._found_OutputDevice
    }
  }

  midiChannelChange(event) {
    this.midiChannel = event
  }

  onModelsChangeControl(event) {
  }

  onSelectedProgramChange(program: ChangeSelectedProgramEvent) {
    // console.log('onSelectedProgramChange', program, this)

    this.currentProgram = program || /** make sure we have an existing instance */ Object.assign({}, EMPTY_PROG)
    // this.currentProgram.conv.switches.eq_enable__presence_bump_
    // this.currentProgram.conv.vol_pedal.minimum
    const currentProgram = this.currentProgram
    // currentProgram.conv.switches.noise_gate_enable
    // currentProgram.conv.preamp.drive_2
    // currentProgram.conv.switches.reverb_enable
    // currentProgram.conv.switches.drive_enable
    // currentProgram.conv.switches.distortion_enable
    // currentProgram.conv.switches.eq_enable__presence_bump_
    // currentProgram.conv.comp_.compression_ratio
    // currentProgram.conv.cab_sim_.air
    // currentProgram.conv.reverb.reverb_type
    // currentProgram.conv.delay.level_1

    // currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable

    // currentProgram.conv.chorus.depth
    // currentProgram.conv.flanger.pre_delay
    // currentProgram.conv.fx_config.effects_select
    // currentProgram.conv.fx_config.effects_tweak
    // currentProgram.conv.rotary.current_speed
    // currentProgram.conv.switches.eq_enable__presence_bump_
    currentProgram.conv.preamp.drive
    currentProgram.conv.preamp.drive_2
  }

  test(event) {
    // console.log('test', event)
  }
}

/**
 * This prevents throwing errors because of missing bindings
 */
export const EMPTY_PROG_CONV = {
  "switches": {
    "distortion_enable": null,
    "drive_enable": null,
    "eq_enable__presence_bump_": null,
    "delay_enable": null,
    "tremolo_rotary_speaker_chorus_flang_e_enable": null,
    "reverb_enable": null,
    "noise_gate_enable": null,
    "bright_switch_enable": null
  },
  "preamp": {
    "amp_model": null,
    "drive": null,
    "drive_2": null,
    "bass": null,
    "mid": null,
    "treble": null,
    "presence": null,
    "chan_vol": null
  },
  "noise_gt": {
    "threshold": null,
    "decay_time": null
  },
  "wah_wah": {
    "level": null,
    "bottom_frequency": null,
    "top_frequency": null,
    "delta": null
  },
  "vol_pedal": {
    "level": null,
    "minimum": null,
    "position": null
  },
  "delay": {
    "delay_type": null,
    "time_1_coarse": null,
    "time_1_fine": null,
    "time_2_coarse": null,
    "time_2_fine": null,
    "feedback_1": null,
    "feedback_2": null,
    "level_1": null,
    "level_2": null
  },
  "reverb": {
    "reverb_type": null,
    "decay": null,
    "tone": null,
    "diffusion": null,
    "density": null,
    "level": null
  },
  "cab_sim_": {
    "cabinet_type": null,
    "air": null
  },
  "fx_config": {
    "effects_select": null,
    "effects_tweak": null
  },
  "swell": {
    "attack_time": null
  },
  "comp_": {
    "compression_ratio": null
  },
  "chorus": {
    "speed": null,
    "depth": null,
    "feedback": null,
    "pre_delay": null
  },
  "flanger": {
    "speed": null,
    "depth": null,
    "feedback": null,
    "pre_delay": null
  },
  "rotary": {
    "current_speed": null,
    "fast_speed": null,
    "slow_speed": null
  },
  "tremolo": {
    "speed": null,
    "depth": null
  },
  "name": {
    "program_name": null
  }
}

export const EMPTY_PROG: ChangeSelectedProgramEvent = {
  nam: null,
  val: null,
  conv: EMPTY_PROG_CONV as ProgramDataSysex
}