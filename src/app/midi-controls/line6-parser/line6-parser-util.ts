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
        console.log('Converted', converted)
        const restored = Parser.convertDataToLBS(converted)
        console.log('Restored', restored)
 * </code>
 */


/** 
 * Representation of the program/patch data contained in the MIDI Sysex message.
 * All types are `number[]` as format 'use only least significant bit'
 * when converted to a single int value then type is `number`.
 */
export interface ProgramDataSysex /** Parser of the program/patch data contained in the MIDI Sysex message */ {
  switches: {
    distortion_enable: number[] | number
    drive_enable: number[] | number
    eq_enable__presence_bump_: number[] | number
    delay_enable: number[] | number
    tremolo_rotary_speaker_chorus_flang_e_enable: number[] | number
    reverb_enable: number[] | number
    noise_gate_enable: number[] | number
    bright_switch_enable: number[] | number
  }
  preamp: {
    amp_model: number[] | number
    drive: number[] | number
    drive_2: number[] | number
    bass: number[] | number
    mid: number[] | number
    treble: number[] | number
    presence: number[] | number
    chan_vol: number[] | number
  }
  noise_gt: {
    threshold: number[] | number
    decay_time: number[] | number
  }
  wah_wah: {
    level: number[] | number
    bottom_frequency: number[] | number
    top_frequency: number[] | number
    delta: number[] | number
  }
  vol_pedal: {
    level: number[] | number
    minimum: number[] | number
    position: number[] | number
  }
  delay: {
    delay_type: number[] | number
    time_1_coarse: number[] | number
    time_1_fine: number[] | number
    time_2_coarse: number[] | number
    time_2_fine: number[] | number
    feedback_1: number[] | number
    feedback_2: number[] | number
    level_1: number[] | number
    level_2: number[] | number
  }
  reverb: {
    reverb_type: number[] | number
    decay: number[] | number
    tone: number[] | number
    diffusion: number[] | number
    density: number[] | number
    level: number[] | number
  }
  cab_sim_: {
    cabinet_type: number[] | number
    air: number[] | number
  }
  fx_config: {
    effects_select: number[] | number
    effects_tweak: number[] | number
  }
  swell: {
    attack_time: number[] | number
  }
  comp_: {
    compression_ratio: number[] | number
  }
  chorus: {
    speed: number[] | number
    depth: number[] | number
    feedback: number[] | number
    pre_delay: number[] | number
  }
  flanger: {
    speed: number[] | number
    depth: number[] | number
    feedback: number[] | number
    pre_delay: number[] | number
  }
  rotary: {
    current_speed: number[] | number
    fast_speed: number[] | number
    slow_speed: number[] | number
  }
  tremolo: {
    speed: number[] | number
    depth: number[] | number
  }
  name: {
    program_name: number[] | number
  }
}


/** 
 * Representation of the program/patch data schema description contained in the MIDI Sysex message.
 */
export const ProgramDataSysexSchema = {
  switches: {
    distortion_enable: {
      pos: [
        0
      ],
      start: 0,
      end: 0,
      length: 1,
      cc: 25,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    drive_enable: {
      pos: [
        1
      ],
      start: 1,
      end: 1,
      length: 1,
      cc: 26,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    eq_enable__presence_bump_: {
      pos: [
        2
      ],
      start: 2,
      end: 2,
      length: 1,
      cc: 27,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    delay_enable: {
      pos: [
        3
      ],
      start: 3,
      end: 3,
      length: 1,
      cc: 28,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    tremolo_rotary_speaker_chorus_flang_e_enable: {
      pos: [
        4
      ],
      start: 4,
      end: 4,
      length: 1,
      cc: 50,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    reverb_enable: {
      pos: [
        5
      ],
      start: 5,
      end: 5,
      length: 1,
      cc: 36,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    noise_gate_enable: {
      pos: [
        6
      ],
      start: 6,
      end: 6,
      length: 1,
      cc: 22,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    bright_switch_enable: {
      pos: [
        7
      ],
      start: 7,
      end: 7,
      length: 1,
      cc: 73,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  preamp: {
    amp_model: {
      pos: [
        8
      ],
      start: 8,
      end: 8,
      length: 1,
      cc: 12,
      min: 0,
      max: 27,
      unused: false,
      internal_use: false
    },
    drive: {
      pos: [
        9
      ],
      start: 9,
      end: 9,
      length: 1,
      cc: 13,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    drive_2: {
      pos: [
        10
      ],
      start: 10,
      end: 10,
      length: 1,
      cc: 20,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    bass: {
      pos: [
        11
      ],
      start: 11,
      end: 11,
      length: 1,
      cc: 14,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    mid: {
      pos: [
        12
      ],
      start: 12,
      end: 12,
      length: 1,
      cc: 15,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    treble: {
      pos: [
        13
      ],
      start: 13,
      end: 13,
      length: 1,
      cc: 16,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    presence: {
      pos: [
        14
      ],
      start: 14,
      end: 14,
      length: 1,
      cc: 21,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    chan_vol: {
      pos: [
        15
      ],
      start: 15,
      end: 15,
      length: 1,
      cc: 17,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  noise_gt: {
    threshold: {
      pos: [
        16
      ],
      start: 16,
      end: 16,
      length: 1,
      cc: 23,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    decay_time: {
      pos: [
        17
      ],
      start: 17,
      end: 17,
      length: 1,
      cc: 24,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  wah_wah: {
    level: {
      pos: [
        18
      ],
      start: 18,
      end: 18,
      length: 1,
      cc: 4,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    bottom_frequency: {
      pos: [
        19
      ],
      start: 19,
      end: 19,
      length: 1,
      cc: 44,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    top_frequency: {
      pos: [
        20
      ],
      start: 20,
      end: 20,
      length: 1,
      cc: 45,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    delta: {
      pos: [
        21
      ],
      start: 21,
      end: 21,
      length: 1,
      cc: null,
      min: null,
      max: null,
      unused: false,
      internal_use: true
    }
  },
  vol_pedal: {
    level: {
      pos: [
        22
      ],
      start: 22,
      end: 22,
      length: 1,
      cc: 7,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    minimum: {
      pos: [
        23
      ],
      start: 23,
      end: 23,
      length: 1,
      cc: 46,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    position: {
      pos: [
        24
      ],
      start: 24,
      end: 24,
      length: 1,
      cc: 47,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  delay: {
    delay_type: {
      pos: [
        25
      ],
      start: 25,
      end: 25,
      length: 1,
      cc: null,
      min: null,
      max: null,
      unused: true,
      internal_use: false
    },
    time_1_coarse: {
      pos: [
        26
      ],
      start: 26,
      end: 26,
      length: 1,
      cc: 30,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    time_1_fine: {
      pos: [
        27,
        28,
        29
      ],
      start: 27,
      end: 29,
      length: 3,
      cc: 62,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    time_2_coarse: {
      pos: [
        30
      ],
      start: 30,
      end: 30,
      length: 1,
      cc: null,
      min: null,
      max: null,
      unused: true,
      internal_use: false
    },
    time_2_fine: {
      pos: [
        31,
        32,
        33
      ],
      start: 31,
      end: 33,
      length: 3,
      cc: null,
      min: null,
      max: null,
      unused: true,
      internal_use: false
    },
    feedback_1: {
      pos: [
        34
      ],
      start: 34,
      end: 34,
      length: 1,
      cc: 32,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    feedback_2: {
      pos: [
        35
      ],
      start: 35,
      end: 35,
      length: 1,
      cc: null,
      min: null,
      max: null,
      unused: true,
      internal_use: false
    },
    level_1: {
      pos: [
        36
      ],
      start: 36,
      end: 36,
      length: 1,
      cc: 34,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    level_2: {
      pos: [
        37
      ],
      start: 37,
      end: 37,
      length: 1,
      cc: null,
      min: null,
      max: null,
      unused: true,
      internal_use: false
    }
  },
  reverb: {
    reverb_type: {
      pos: [
        38
      ],
      start: 38,
      end: 38,
      length: 1,
      cc: 37,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    decay: {
      pos: [
        39
      ],
      start: 39,
      end: 39,
      length: 1,
      cc: 38,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    tone: {
      pos: [
        40
      ],
      start: 40,
      end: 40,
      length: 1,
      cc: 39,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    diffusion: {
      pos: [
        41
      ],
      start: 41,
      end: 41,
      length: 1,
      cc: 40,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    density: {
      pos: [
        42
      ],
      start: 42,
      end: 42,
      length: 1,
      cc: 41,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    level: {
      pos: [
        43
      ],
      start: 43,
      end: 43,
      length: 1,
      cc: 18,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  cab_sim_: {
    cabinet_type: {
      pos: [
        44
      ],
      start: 44,
      end: 44,
      length: 1,
      cc: 71,
      min: 0,
      max: 15,
      unused: false,
      internal_use: false
    },
    air: {
      pos: [
        45
      ],
      start: 45,
      end: 45,
      length: 1,
      cc: 72,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  fx_config: {
    effects_select: {
      pos: [
        46
      ],
      start: 46,
      end: 46,
      length: 1,
      cc: 19,
      min: 0,
      max: 15,
      unused: false,
      internal_use: false
    },
    effects_tweak: {
      pos: [
        47
      ],
      start: 47,
      end: 47,
      length: 1,
      cc: 1,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  swell: {
    attack_time: {
      pos: [
        48
      ],
      start: 48,
      end: 48,
      length: 1,
      cc: 49,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  comp_: {
    compression_ratio: {
      pos: [
        48
      ],
      start: 48,
      end: 48,
      length: 1,
      cc: 42,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  chorus: {
    speed: {
      pos: [
        48,
        49
      ],
      start: 48,
      end: 49,
      length: 2,
      cc: 51,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    depth: {
      pos: [
        50,
        51
      ],
      start: 50,
      end: 51,
      length: 2,
      cc: 52,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    feedback: {
      pos: [
        52
      ],
      start: 52,
      end: 52,
      length: 1,
      cc: 53,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    pre_delay: {
      pos: [
        53,
        54
      ],
      start: 53,
      end: 54,
      length: 2,
      cc: 54,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  flanger: {
    speed: {
      pos: [
        48,
        49
      ],
      start: 48,
      end: 49,
      length: 2,
      cc: 51,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    depth: {
      pos: [
        50,
        51
      ],
      start: 50,
      end: 51,
      length: 2,
      cc: 52,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    feedback: {
      pos: [
        52
      ],
      start: 52,
      end: 52,
      length: 1,
      cc: 53,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    pre_delay: {
      pos: [
        53,
        54
      ],
      start: 53,
      end: 54,
      length: 2,
      cc: 54,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  rotary: {
    current_speed: {
      pos: [
        48
      ],
      start: 48,
      end: 48,
      length: 1,
      cc: 55,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    fast_speed: {
      pos: [
        49,
        50
      ],
      start: 49,
      end: 50,
      length: 2,
      cc: 56,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    slow_speed: {
      pos: [
        51,
        52
      ],
      start: 51,
      end: 52,
      length: 2,
      cc: 57,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  tremolo: {
    speed: {
      pos: [
        48,
        49
      ],
      start: 48,
      end: 49,
      length: 2,
      cc: 58,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    },
    depth: {
      pos: [
        50
      ],
      start: 50,
      end: 50,
      length: 1,
      cc: 59,
      min: 0,
      max: 127,
      unused: false,
      internal_use: false
    }
  },
  name: {
    program_name: {
      pos: [
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70
      ],
      start: 55,
      end: 70,
      length: 16,
      cc: null,
      min: null,
      max: null,
      unused: false,
      internal_use: false
    }
  }
}






export const ProgramDataSysexMapper = (__prg_data: IProgramDataParser): ProgramDataSysex => {
  const __prg_schema = ProgramDataSysexSchema
  const getVal = (start: number, length: number) => {
    return __prg_data.prg(start, length)
  }
  const result: ProgramDataSysex = /** Parser of the program/patch data contained in the MIDI Sysex message */
  {
    switches: {
      distortion_enable: getVal(__prg_schema.switches.distortion_enable.start, __prg_schema.switches.distortion_enable.length),
      drive_enable: getVal(__prg_schema.switches.drive_enable.start, __prg_schema.switches.drive_enable.length),
      eq_enable__presence_bump_: getVal(__prg_schema.switches.eq_enable__presence_bump_.start, __prg_schema.switches.eq_enable__presence_bump_.length),
      delay_enable: getVal(__prg_schema.switches.delay_enable.start, __prg_schema.switches.delay_enable.length),
      tremolo_rotary_speaker_chorus_flang_e_enable: getVal(__prg_schema.switches.tremolo_rotary_speaker_chorus_flang_e_enable.start, __prg_schema.switches.tremolo_rotary_speaker_chorus_flang_e_enable.length),
      reverb_enable: getVal(__prg_schema.switches.reverb_enable.start, __prg_schema.switches.reverb_enable.length),
      noise_gate_enable: getVal(__prg_schema.switches.noise_gate_enable.start, __prg_schema.switches.noise_gate_enable.length),
      bright_switch_enable: getVal(__prg_schema.switches.bright_switch_enable.start, __prg_schema.switches.bright_switch_enable.length)
    },
    preamp: {
      amp_model: getVal(__prg_schema.preamp.amp_model.start, __prg_schema.preamp.amp_model.length),
      drive: getVal(__prg_schema.preamp.drive.start, __prg_schema.preamp.drive.length),
      drive_2: getVal(__prg_schema.preamp.drive_2.start, __prg_schema.preamp.drive_2.length),
      bass: getVal(__prg_schema.preamp.bass.start, __prg_schema.preamp.bass.length),
      mid: getVal(__prg_schema.preamp.mid.start, __prg_schema.preamp.mid.length),
      treble: getVal(__prg_schema.preamp.treble.start, __prg_schema.preamp.treble.length),
      presence: getVal(__prg_schema.preamp.presence.start, __prg_schema.preamp.presence.length),
      chan_vol: getVal(__prg_schema.preamp.chan_vol.start, __prg_schema.preamp.chan_vol.length)
    },
    noise_gt: {
      threshold: getVal(__prg_schema.noise_gt.threshold.start, __prg_schema.noise_gt.threshold.length),
      decay_time: getVal(__prg_schema.noise_gt.decay_time.start, __prg_schema.noise_gt.decay_time.length)
    },
    wah_wah: {
      level: getVal(__prg_schema.wah_wah.level.start, __prg_schema.wah_wah.level.length),
      bottom_frequency: getVal(__prg_schema.wah_wah.bottom_frequency.start, __prg_schema.wah_wah.bottom_frequency.length),
      top_frequency: getVal(__prg_schema.wah_wah.top_frequency.start, __prg_schema.wah_wah.top_frequency.length),
      delta: getVal(__prg_schema.wah_wah.delta.start, __prg_schema.wah_wah.delta.length)
    },
    vol_pedal: {
      level: getVal(__prg_schema.vol_pedal.level.start, __prg_schema.vol_pedal.level.length),
      minimum: getVal(__prg_schema.vol_pedal.minimum.start, __prg_schema.vol_pedal.minimum.length),
      position: getVal(__prg_schema.vol_pedal.position.start, __prg_schema.vol_pedal.position.length)
    },
    delay: {
      delay_type: getVal(__prg_schema.delay.delay_type.start, __prg_schema.delay.delay_type.length),
      time_1_coarse: getVal(__prg_schema.delay.time_1_coarse.start, __prg_schema.delay.time_1_coarse.length),
      time_1_fine: getVal(__prg_schema.delay.time_1_fine.start, __prg_schema.delay.time_1_fine.length),
      time_2_coarse: getVal(__prg_schema.delay.time_2_coarse.start, __prg_schema.delay.time_2_coarse.length),
      time_2_fine: getVal(__prg_schema.delay.time_2_fine.start, __prg_schema.delay.time_2_fine.length),
      feedback_1: getVal(__prg_schema.delay.feedback_1.start, __prg_schema.delay.feedback_1.length),
      feedback_2: getVal(__prg_schema.delay.feedback_2.start, __prg_schema.delay.feedback_2.length),
      level_1: getVal(__prg_schema.delay.level_1.start, __prg_schema.delay.level_1.length),
      level_2: getVal(__prg_schema.delay.level_2.start, __prg_schema.delay.level_2.length)
    },
    reverb: {
      reverb_type: getVal(__prg_schema.reverb.reverb_type.start, __prg_schema.reverb.reverb_type.length),
      decay: getVal(__prg_schema.reverb.decay.start, __prg_schema.reverb.decay.length),
      tone: getVal(__prg_schema.reverb.tone.start, __prg_schema.reverb.tone.length),
      diffusion: getVal(__prg_schema.reverb.diffusion.start, __prg_schema.reverb.diffusion.length),
      density: getVal(__prg_schema.reverb.density.start, __prg_schema.reverb.density.length),
      level: getVal(__prg_schema.reverb.level.start, __prg_schema.reverb.level.length)
    },
    cab_sim_: {
      cabinet_type: getVal(__prg_schema.cab_sim_.cabinet_type.start, __prg_schema.cab_sim_.cabinet_type.length),
      air: getVal(__prg_schema.cab_sim_.air.start, __prg_schema.cab_sim_.air.length)
    },
    fx_config: {
      effects_select: getVal(__prg_schema.fx_config.effects_select.start, __prg_schema.fx_config.effects_select.length),
      effects_tweak: getVal(__prg_schema.fx_config.effects_tweak.start, __prg_schema.fx_config.effects_tweak.length)
    },
    swell: {
      attack_time: getVal(__prg_schema.swell.attack_time.start, __prg_schema.swell.attack_time.length)
    },
    comp_: {
      compression_ratio: getVal(__prg_schema.comp_.compression_ratio.start, __prg_schema.comp_.compression_ratio.length)
    },
    chorus: {
      speed: getVal(__prg_schema.chorus.speed.start, __prg_schema.chorus.speed.length),
      depth: getVal(__prg_schema.chorus.depth.start, __prg_schema.chorus.depth.length),
      feedback: getVal(__prg_schema.chorus.feedback.start, __prg_schema.chorus.feedback.length),
      pre_delay: getVal(__prg_schema.chorus.pre_delay.start, __prg_schema.chorus.pre_delay.length)
    },
    flanger: {
      speed: getVal(__prg_schema.flanger.speed.start, __prg_schema.flanger.speed.length),
      depth: getVal(__prg_schema.flanger.depth.start, __prg_schema.flanger.depth.length),
      feedback: getVal(__prg_schema.flanger.feedback.start, __prg_schema.flanger.feedback.length),
      pre_delay: getVal(__prg_schema.flanger.pre_delay.start, __prg_schema.flanger.pre_delay.length)
    },
    rotary: {
      current_speed: getVal(__prg_schema.rotary.current_speed.start, __prg_schema.rotary.current_speed.length),
      fast_speed: getVal(__prg_schema.rotary.fast_speed.start, __prg_schema.rotary.fast_speed.length),
      slow_speed: getVal(__prg_schema.rotary.slow_speed.start, __prg_schema.rotary.slow_speed.length)
    },
    tremolo: {
      speed: getVal(__prg_schema.tremolo.speed.start, __prg_schema.tremolo.speed.length),
      depth: getVal(__prg_schema.tremolo.depth.start, __prg_schema.tremolo.depth.length)
    },
    name: {
      program_name: getVal(__prg_schema.name.program_name.start, __prg_schema.name.program_name.length)
    }
  }
  return result
}

export interface IProgramDataParser {
  prg: (offset: number, length: number) => number[]
}




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
  addVal(__prg_data.switches.distortion_enable, __prg_schema.switches.distortion_enable.start)
  addVal(__prg_data.switches.drive_enable, __prg_schema.switches.drive_enable.start)
  addVal(__prg_data.switches.eq_enable__presence_bump_, __prg_schema.switches.eq_enable__presence_bump_.start)
  addVal(__prg_data.switches.delay_enable, __prg_schema.switches.delay_enable.start)
  addVal(__prg_data.switches.tremolo_rotary_speaker_chorus_flang_e_enable, __prg_schema.switches.tremolo_rotary_speaker_chorus_flang_e_enable.start)
  addVal(__prg_data.switches.reverb_enable, __prg_schema.switches.reverb_enable.start)
  addVal(__prg_data.switches.noise_gate_enable, __prg_schema.switches.noise_gate_enable.start)
  addVal(__prg_data.switches.bright_switch_enable, __prg_schema.switches.bright_switch_enable.start)
  addVal(__prg_data.preamp.amp_model, __prg_schema.preamp.amp_model.start)
  addVal(__prg_data.preamp.drive, __prg_schema.preamp.drive.start)
  addVal(__prg_data.preamp.drive_2, __prg_schema.preamp.drive_2.start)
  addVal(__prg_data.preamp.bass, __prg_schema.preamp.bass.start)
  addVal(__prg_data.preamp.mid, __prg_schema.preamp.mid.start)
  addVal(__prg_data.preamp.treble, __prg_schema.preamp.treble.start)
  addVal(__prg_data.preamp.presence, __prg_schema.preamp.presence.start)
  addVal(__prg_data.preamp.chan_vol, __prg_schema.preamp.chan_vol.start)
  addVal(__prg_data.noise_gt.threshold, __prg_schema.noise_gt.threshold.start)
  addVal(__prg_data.noise_gt.decay_time, __prg_schema.noise_gt.decay_time.start)
  addVal(__prg_data.wah_wah.level, __prg_schema.wah_wah.level.start)
  addVal(__prg_data.wah_wah.bottom_frequency, __prg_schema.wah_wah.bottom_frequency.start)
  addVal(__prg_data.wah_wah.top_frequency, __prg_schema.wah_wah.top_frequency.start)
  addVal(__prg_data.wah_wah.delta, __prg_schema.wah_wah.delta.start)
  addVal(__prg_data.vol_pedal.level, __prg_schema.vol_pedal.level.start)
  addVal(__prg_data.vol_pedal.minimum, __prg_schema.vol_pedal.minimum.start)
  addVal(__prg_data.vol_pedal.position, __prg_schema.vol_pedal.position.start)
  addVal(__prg_data.delay.delay_type, __prg_schema.delay.delay_type.start)
  addVal(__prg_data.delay.time_1_coarse, __prg_schema.delay.time_1_coarse.start)
  addVal(__prg_data.delay.time_1_fine, __prg_schema.delay.time_1_fine.start)
  addVal(__prg_data.delay.time_2_coarse, __prg_schema.delay.time_2_coarse.start)
  addVal(__prg_data.delay.time_2_fine, __prg_schema.delay.time_2_fine.start)
  addVal(__prg_data.delay.feedback_1, __prg_schema.delay.feedback_1.start)
  addVal(__prg_data.delay.feedback_2, __prg_schema.delay.feedback_2.start)
  addVal(__prg_data.delay.level_1, __prg_schema.delay.level_1.start)
  addVal(__prg_data.delay.level_2, __prg_schema.delay.level_2.start)
  addVal(__prg_data.reverb.reverb_type, __prg_schema.reverb.reverb_type.start)
  addVal(__prg_data.reverb.decay, __prg_schema.reverb.decay.start)
  addVal(__prg_data.reverb.tone, __prg_schema.reverb.tone.start)
  addVal(__prg_data.reverb.diffusion, __prg_schema.reverb.diffusion.start)
  addVal(__prg_data.reverb.density, __prg_schema.reverb.density.start)
  addVal(__prg_data.reverb.level, __prg_schema.reverb.level.start)
  addVal(__prg_data.cab_sim_.cabinet_type, __prg_schema.cab_sim_.cabinet_type.start)
  addVal(__prg_data.cab_sim_.air, __prg_schema.cab_sim_.air.start)
  addVal(__prg_data.fx_config.effects_select, __prg_schema.fx_config.effects_select.start)
  addVal(__prg_data.fx_config.effects_tweak, __prg_schema.fx_config.effects_tweak.start)
  addVal(__prg_data.swell.attack_time, __prg_schema.swell.attack_time.start)
  addVal(__prg_data.comp_.compression_ratio, __prg_schema.comp_.compression_ratio.start)
  addVal(__prg_data.chorus.speed, __prg_schema.chorus.speed.start)
  addVal(__prg_data.chorus.depth, __prg_schema.chorus.depth.start)
  addVal(__prg_data.chorus.feedback, __prg_schema.chorus.feedback.start)
  addVal(__prg_data.chorus.pre_delay, __prg_schema.chorus.pre_delay.start)
  addVal(__prg_data.flanger.speed, __prg_schema.flanger.speed.start)
  addVal(__prg_data.flanger.depth, __prg_schema.flanger.depth.start)
  addVal(__prg_data.flanger.feedback, __prg_schema.flanger.feedback.start)
  addVal(__prg_data.flanger.pre_delay, __prg_schema.flanger.pre_delay.start)
  addVal(__prg_data.rotary.current_speed, __prg_schema.rotary.current_speed.start)
  addVal(__prg_data.rotary.fast_speed, __prg_schema.rotary.fast_speed.start)
  addVal(__prg_data.rotary.slow_speed, __prg_schema.rotary.slow_speed.start)
  addVal(__prg_data.tremolo.speed, __prg_schema.tremolo.speed.start)
  addVal(__prg_data.tremolo.depth, __prg_schema.tremolo.depth.start)
  addVal(__prg_data.name.program_name, __prg_schema.name.program_name.start)
  /** total bytes 74x2 */
  // assert array is exact 142 bytes
  if (value.length != 142) {
    throw new Error(`ProgramDataSysex must be exact 142 bytes but is ${value.length}`)
  }
  return value
}
