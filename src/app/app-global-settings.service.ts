import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppStorageService } from './app.storage.service';
import { DeviceDetectorService } from './device-detector.service';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalSettingsService {
  environment = environment


  /**
   * Enable debug mode
   */
  get debug() { return this.storage.getBool('debug', this.environment.__debug) }
  set debug(value: boolean) {
    this.storage.setBool('debug', value)
    this.environment.__debug = value
  }

  /**
 * Enable debug mode
 */
  get logging() { return this.storage.getBool('logging', this.environment.__logging) }
  set logging(value: boolean) {
    this.storage.setBool('logging', value)
    this.environment.__logging = value
  }

  /**
   * Will render native select HTML elements for touch devices
   */
  nativeSelectForTouchDevice = false // this.deviceDetectorService.touchDevice
  // set this to set it by the touch device detector
  // nativeSelectForTouchDevice = this.deviceDetectorService.touchDevice

  /**
   * The MIDI device used by the widgets handled by the webmidi service api.
   */
  get useGlobalServiceDevices(): boolean { return this.storage.getBool('useGlobalServiceDevices', true) }
  set useGlobalServiceDevices(value: boolean) { this.storage.setBool('useGlobalServiceDevices', value) }

  /**
   * Make the MIDI control card full width and content height on mobile devices
   * 
   */
  get cardsFullwithOnMobile(): boolean { return this.storage.getBool('cardsFullwithOnMobile', this.deviceDetectorService.mobileDevice) }
  set cardsFullwithOnMobile(value: boolean) { this.storage.setBool('cardsFullwithOnMobile', value) }

  /**
   * User radio-group instead of dropdown for pre-defined values
   */
  get useRadioGroupInsteadOfDropdown(): boolean { return this.storage.getBool('useRadioGroupInsteadOfDropdown', false) }
  set useRadioGroupInsteadOfDropdown(value: boolean) { this.storage.setBool('useRadioGroupInsteadOfDropdown', value) }

  /**
   * 
   */
  get enableSettings() { return this.storage.getBool('enableSettings', false) }
  set enableSettings(value: boolean) { this.storage.setBool('enableSettings', value) }

  /**
   * Show columns instead of cards
   */
  get useColumns() { return this.storage.getBool('useColumns', false) }
  set useColumns(value: boolean) { this.storage.setBool('useColumns', value) }

  get sliderLayoutType(): SliderLayoutType { return this.storage.getString('sliderLayoutType', SliderLayoutType.round) as SliderLayoutType }
  set sliderLayoutType(value: SliderLayoutType) { this.storage.setString('sliderLayoutType', value) }

  /**
   * Enable drag and drop for some controls
   */
  get dragAndDropEnabled() { return this.storage.getBool('dragAndDropEnabled', /** TODO set to default true when the program/patch control can be aligned within the other dragable controls*/false) }
  set dragAndDropEnabled(value: boolean) { this.storage.setBool('dragAndDropEnabled', value) }

  static DEFAULT_CONTROLS_ORDER = [/*'Line6 Pocket POD', 'Devices', 'Program Center',*/  'Volume', 'EQ', 'Drive', 'Noise Gate', 'Boost', 'Reverb', 'Swell', 'Delay', 'Compression', 'Chorus', 'Flanger', 'Rotary', 'Tremolo', 'Wah']
  get controlsOrder() { return this.storage.getStringArray('controlsOrder', AppGlobalSettingsService.DEFAULT_CONTROLS_ORDER) }
  set controlsOrder(value: string[]) { this.storage.setStringArray('controlsOrder', value) }

  constructor(public deviceDetectorService: DeviceDetectorService, private storage: AppStorageService) {
    // this.nativeSelectForTouchDevice = this.deviceDetectorService.touchDevice
    this.cardsFullwithOnMobile = this.deviceDetectorService.mobileDevice
    // enable initial value in environment.ts
    this.logging = this.logging
  }

}

export enum SliderLayoutType {
  round = 'round',
  horizontal = 'horizontal',
  vertical = 'vertical',
  text = 'text'
}
