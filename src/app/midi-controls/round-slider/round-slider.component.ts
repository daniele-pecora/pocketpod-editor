import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// import * as $ from 'jquery';
declare const $: any;

@Component({
  selector: 'app-round-slider',
  templateUrl: './round-slider.component.html',
  styleUrls: ['./round-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoundSliderComponent),
      multi: true
    }
  ]
})
export class RoundSliderComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
  /** -- START value accessor -- */
  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  // Function to call when the rating changes.
  onChange = (value: number) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };

  writeValue(value: number): void {
    this.value = value
    // this.onChange(value)
    // this.addSlider()
    this.updateSlider()
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
  /** -- END value accessor -- */

  @Input()
  Disabled: boolean
  disabled = this.Disabled

  @Input()
  Value: number
  value: number = this.Value

  @Input()
  Animation: boolean
  animation: boolean = this.Animation

  @ViewChild('slider', { static: true })
  slider: ElementRef

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let doUpdate = false
    if (changes.Disabled) {
      if (changes.Disabled.currentValue !== changes.Disabled.previousValue) {
        this.disabled = changes.Disabled.currentValue
        doUpdate = true
      }
    }
    if (changes.Value) {
      if (changes.Value.currentValue !== changes.Value.previousValue) {
        this.value = changes.Value.currentValue
        doUpdate = true
      }
    }
    if (changes.Animation) {
      if (changes.Animation.currentValue !== changes.Animation.previousValue) {
        this.animation = changes.Animation.currentValue
        doUpdate = true
      }
    }
    if (doUpdate) {
      this.addSlider()
    }

  }
  ngAfterViewInit(): void {
    this.addSlider()
  }
  updateSlider() {
    $(this.slider.nativeElement)
      .roundSlider('setValue', this.value)
  }
  addSlider() {
    const _disabled = this.disabled
    const _animation = this.animation
    const _value = this.value
    const _onTouched = this.onTouched
    const _onChange = this.onChange
    const _updateValueOnEvent = (value: number) => {
      this.value = value
      this.onChange(value)
    }
    const _currentVal = () => {
      return this.value
    }
    $(this.slider.nativeElement)
      .roundSlider({
        disabled: _disabled,
        value: _value,
        drag: function (args) {
          // handle the drag event here
          // console.log('round slider drag', args, 'this_val', _currentVal())

          if (args.value !== args.preValue && args.value !== _currentVal()) {
            _updateValueOnEvent(args.value)
            // console.log('round slider drag [updated] this_val', _currentVal())
          }
        },
        change: function (args) {
          // handle the change event here
          // console.log('round slider change', args, 'this_val', _currentVal())

          _onTouched()
          if (args.value !== args.preValue && args.value !== _currentVal()) {
            _updateValueOnEvent(args.value)
            // console.log('round slider change [updated] this_val', _currentVal())
          }
        },


        radius: 30,
        circleShape: "pie",
        lineCap: "round",
        width: 7,
        sliderType: "min-range",
        mouseScrollAction: true,
        max: "127"
        , startAngle: 315
        , keyboardAction: true

        , showTooltip: true
        , editableTooltip: true

        , handleShape: "round"
        , handleSize: "+4"

        , animation: _animation
      });
  }

  addSlider_example() {
    $("#slider")
      .roundSlider({
        min: 0,
        max: 100,
        step: 1,
        value: null,
        radius: 85,
        width: 16,
        handleSize: "+0",
        startAngle: 0,
        endAngle: "+360",
        animation: true,
        showTooltip: true,
        editableTooltip: true,
        readOnly: false,
        disabled: false,
        keyboardAction: true,
        mouseScrollAction: false,
        sliderType: "default",
        circleShape: "full",
        handleShape: "round",
        lineCap: "square",

        // events
        beforeCreate: null,
        create: null,
        start: null,
        drag: null,
        change: null,
        stop: null,
        tooltipFormat: null
      });
  }

}
