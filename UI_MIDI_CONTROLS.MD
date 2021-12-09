This project also contains widgets to create MIDI UI controls.

(TODO create a library from it)

Example of a General CC Widget
```html

<app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
    Label="General CC"
></app-midicc-control>
```

Example of a General CC Widget with no label
```html

<app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
    Label=""
    [styleVertical]="false"
    [styleInline]="false"
></app-midicc-control>


```


Example of a Widget with predefined values and pre-selected default value
```html

<app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
    Label="Compression Ratio"
    Note="Compression Ratio"
    MIDICC="42"
    [MIDIPredefinedValues]="[
        {label:'Off',value:0, default:true},
        {label:'1.4:1',value:25},
        {label:'2:1',value:50},
        {label:'3:1',value:75},
        {label:'6:1',value:100},
        {label:'Infinity:1',value:125}
    ]"
></app-midicc-control>
```

Example of a Widget style inline with predefined values and a label
```html

<app-control-card Title="Compression" Subtitle="Black hole!">
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Ratio"
        Note="Compression Ratio"
        MIDICC="42"
        [styleInline]="true"
        [MIDIPredefinedValues]="[
            {label:'Off',value:0},
            {label:'1.4:1',value:25},
            {label:'2:1',value:50},
            {label:'3:1',value:75},
            {label:'6:1',value:100},
            {label:'Infinity:1',value:125}
        ]"
    ></app-midicc-control>
</app-control-card>

```


Example of how to put multiple control in one card
```html
<app-control-card Title="Modulation" Subtitle="Some space out there"
*ngIf="__debug || -1!==[0,1,2,3,4,5,8,9,11,12,13,15].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
Autosize="width"
>
<!--
      { value: 0, label: 'Chorus2' },
      { value: 1, label: 'Flanger1' },
      { value: 2, label: 'Rotary' },
      { value: 3, label: 'Flanger2' },
      { value: 4, label: 'Delay/Chorus1' },
      { value: 5, label: 'Delay/Tremolo' },
      -- { value: 6, label: 'Delay' },
      -- { value: 7, label: 'Delay/Comp' },
      { value: 8, label: 'Chorus1' },
      { value: 9, label: 'Tremolo' },
      -- { value: 10, label: 'Bypass' },
      -- { value: 11, label: 'Compressor' },
      { value: 12, label: 'Delay/Chorus2' },
      { value: 13, label: 'Delay/Flanger1' },
      -- { value: 14, label: 'Delay/Swell' },
      { value: 15, label: 'Delay/Flanger2' }
-->
    <div class="card-container" 
        *ngIf="__debug || -1!==[0,4,8,12].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
    >
<!--
      { value: 0, label: 'Chorus2' },
      { value: 4, label: 'Delay/Chorus1' },
      { value: 8, label: 'Chorus1' },
      { value: 12, label: 'Delay/Chorus2' },
-->
    <h3>Chorus</h3>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Enable"
        MIDICC="50"
        MIDICCActivate="50"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
        #midi_control_chorus
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Speed"
        Note="Modulation speed"
        MIDICC="51"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.chorus.speed"
        [Disabled]="!midi_control_chorus.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Depth"
        Note="Modulation depth"
        MIDICC="52"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.chorus.depth"
        [Disabled]="!midi_control_chorus.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Feedback"
        Note="Modulation regeneration (feedback)"
        MIDICC="53"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.chorus.feedback"
        [Disabled]="!midi_control_chorus.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Pre"
        Note="Modulation pre-delay"
        MIDICC="54"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.chorus.pre_delay"
        [Disabled]="!midi_control_chorus.activeState"
    ></app-midicc-control>
    </div>

    <div class="card-container" 
        *ngIf="__debug || -1!==[1,3,13,15].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
    >
<!--
      { value: 1, label: 'Flanger1' },
      { value: 3, label: 'Flanger2' },
      { value: 13, label: 'Delay/Flanger1' },
      { value: 15, label: 'Delay/Flanger2' }
-->
    <h3>Flanger</h3>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Enable"
        MIDICC="50"
        MIDICCActivate="50"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
        #midi_control_flanger
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Speed"
        Note="Modulation speed"
        MIDICC="51"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.flanger.speed"
        [Disabled]="!midi_control_flanger.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Depth"
        Note="Modulation depth"
        MIDICC="52"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.flanger.depth"
        [Disabled]="!midi_control_flanger.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Feedback"
        Note="Modulation regeneration (feedback)"
        MIDICC="53"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.flanger.feedback"
        [Disabled]="!midi_control_flanger.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Pre"
        Note="Modulation pre-delay"
        MIDICC="54"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.flanger.pre_delay"
        [Disabled]="!midi_control_flanger.activeState"
    ></app-midicc-control>
    </div>


    <div class="card-container"
        *ngIf="__debug || -1!==[2].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
    >
    <!--
      { value: 2, label: 'Rotary' }
    -->
    <h3>Rotary Speaker</h3>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Enable"
        Note="Rotary speaker on/off"
        MIDICC="50"
        MIDICCActivate="50"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
        #midi_control_rotary
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Depth"
        Note="Rotary speaker depth (Tweak)"
        MIDICC="01"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.fx_config.effects_tweak"
        [Disabled]="!midi_control_rotary.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Fast"
        Note="Rotary speaker max speed"
        MIDICC="56"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.rotary.fast_speed"
        [Disabled]="!midi_control_rotary.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Fast/Slow"
        Note="Rotary speaker current speed. Switches between 'Fast' and 'Slow' speed"
        MIDICC="55"
        MIDICCActivate="55"
        MIDICCActivateEnable="127"
        MIDICCActivateDisable="0"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.rotary.current_speed"
        [Disabled]="!midi_control_rotary.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Slow"
        Note="Rotary speaker min speed"
        MIDICC="57"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.rotary.slow_speed"
        [Disabled]="!midi_control_rotary.activeState"
    ></app-midicc-control>
    </div>

    <div class="card-container"
        *ngIf="__debug || -1!==[5,9].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
    >
    <!--
      { value: 5, label: 'Delay/Tremolo' },
      { value: 9, label: 'Tremolo' },
    -->
    <h3>Tremolo</h3>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Enable"
        Note="Tremolo on/off"
        MIDICC="50"
        MIDICCActivate="50"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
        #midi_control_tremolo
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Speed"
        Note="Tremolo speed"
        MIDICC="58"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.tremolo.speed"
        [Disabled]="!midi_control_tremolo.activeState"
    ></app-midicc-control>
    <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
        Label="Depth"
        Note="Tremolo depth"
        MIDICC="59"
        [styleVertical]="true"
        [styleInline]="true"
        [MIDIValue]="currentProgram.conv.tremolo.depth"
        [Disabled]="!midi_control_tremolo.activeState"
    ></app-midicc-control>
    </div>
</app-control-card>
```
SCSS to this the example above   
```scss

.card-container {
    display: inline-block;
    vertical-align: top;
    padding-left:1em;
    padding-right:1em;

    border-right: dashed 1px #ccc;

    &:last-of-type {
        border:none;
    }
}
```

Example of how not to put multiple control in one card
```html

<ng-container 
    *ngIf="__debug || -1!==[0,1,2,3,4,5,8,9,11,12,13,15].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)">
    <!--
          { value: 0, label: 'Chorus2' },
          { value: 1, label: 'Flanger1' },
          { value: 2, label: 'Rotary' },
          { value: 3, label: 'Flanger2' },
          { value: 4, label: 'Delay/Chorus1' },
          { value: 5, label: 'Delay/Tremolo' },
          -- { value: 6, label: 'Delay' },
          -- { value: 7, label: 'Delay/Comp' },
          { value: 8, label: 'Chorus1' },
          { value: 9, label: 'Tremolo' },
          -- { value: 10, label: 'Bypass' },
          -- { value: 11, label: 'Compressor' },
          { value: 12, label: 'Delay/Chorus2' },
          { value: 13, label: 'Delay/Flanger1' },
          -- { value: 14, label: 'Delay/Swell' },
          { value: 15, label: 'Delay/Flanger2' }
    -->    
    <app-control-card Title="Chorus" Subtitle="Some space out there"
        Autosize="width"
        *ngIf="__debug || -1!==[0,4,8,12].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
    >
    <!--
          { value: 0, label: 'Chorus2' },
          { value: 4, label: 'Delay/Chorus1' },
          { value: 8, label: 'Chorus1' },
          { value: 12, label: 'Delay/Chorus2' },
    -->
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Enable"
            MIDICC="50"
            MIDICCActivate="50"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
            #midi_control_chorus
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Speed"
            Note="Modulation speed"
            MIDICC="51"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.chorus.speed"
            [Disabled]="!midi_control_chorus.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Depth"
            Note="Modulation depth"
            MIDICC="52"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.chorus.depth"
            [Disabled]="!midi_control_chorus.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Feedback"
            Note="Modulation regeneration (feedback)"
            MIDICC="53"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.chorus.feedback"
            [Disabled]="!midi_control_chorus.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Pre"
            Note="Modulation pre-delay"
            MIDICC="54"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.chorus.pre_delay"
            [Disabled]="!midi_control_chorus.activeState"
        ></app-midicc-control>
    </app-control-card>
    
    <app-control-card Title="Flanger" Subtitle="Some space out there"
        Autosize="width"
            *ngIf="__debug || -1!==[1,3,13,15].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
        >
    <!--
          { value: 1, label: 'Flanger1' },
          { value: 3, label: 'Flanger2' },
          { value: 13, label: 'Delay/Flanger1' },
          { value: 15, label: 'Delay/Flanger2' }
    -->
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Enable"
            MIDICC="50"
            MIDICCActivate="50"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
            #midi_control_flanger
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Speed"
            Note="Modulation speed"
            MIDICC="51"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.flanger.speed"
            [Disabled]="!midi_control_flanger.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Depth"
            Note="Modulation depth"
            MIDICC="52"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.flanger.depth"
            [Disabled]="!midi_control_flanger.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Feedback"
            Note="Modulation regeneration (feedback)"
            MIDICC="53"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.flanger.feedback"
            [Disabled]="!midi_control_flanger.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Pre"
            Note="Modulation pre-delay"
            MIDICC="54"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.flanger.pre_delay"
            [Disabled]="!midi_control_flanger.activeState"
        ></app-midicc-control>
    </app-control-card>
    
    <app-control-card Title="Rotary" Subtitle="Some space out there"
        Autosize="width"
            *ngIf="__debug || -1!==[2].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
        >
        <!--
          { value: 2, label: 'Rotary' }
        -->
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Enable"
            Note="Rotary speaker on/off"
            MIDICC="50"
            MIDICCActivate="50"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
            #midi_control_rotary
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Depth"
            Note="Rotary speaker depth (Tweak)"
            MIDICC="01"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.fx_config.effects_tweak"
            [Disabled]="!midi_control_rotary.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Fast"
            Note="Rotary speaker max speed"
            MIDICC="56"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.rotary.fast_speed"
            [Disabled]="!midi_control_rotary.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Fast/Slow"
            Note="Rotary speaker current speed. Switches between 'Fast' and 'Slow' speed"
            MIDICC="55"
            MIDICCActivate="55"
            MIDICCActivateEnable="127"
            MIDICCActivateDisable="0"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.rotary.current_speed"
            [Disabled]="!midi_control_rotary.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Slow"
            Note="Rotary speaker min speed"
            MIDICC="57"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.rotary.slow_speed"
            [Disabled]="!midi_control_rotary.activeState"
        ></app-midicc-control>
    </app-control-card>
    
    <app-control-card Title="Tremolo" Subtitle="Some space out there"
        Autosize="width"
            *ngIf="__debug || -1!==[5,9].indexOf((program_models.ModelTablesSelectedItem[19]||{value:-1}).value)"
        >
        <!--
          { value: 5, label: 'Delay/Tremolo' },
          { value: 9, label: 'Tremolo' },
        -->
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Enable"
            Note="Tremolo on/off"
            MIDICC="50"
            MIDICCActivate="50"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.switches.tremolo_rotary_speaker_chorus_flang_e_enable"
            #midi_control_tremolo
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Speed"
            Note="Tremolo speed"
            MIDICC="58"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.tremolo.speed"
            [Disabled]="!midi_control_tremolo.activeState"
        ></app-midicc-control>
        <app-midicc-control [OutputDevice]="OutputDevice" [InputDevice]="InputDevice" [MIDIChannel]="midiChannel"
            Label="Depth"
            Note="Tremolo depth"
            MIDICC="59"
            [styleVertical]="true"
            [styleInline]="true"
            [MIDIValue]="currentProgram.conv.tremolo.depth"
            [Disabled]="!midi_control_tremolo.activeState"
        ></app-midicc-control>
    </app-control-card>
    
</ng-container>


```