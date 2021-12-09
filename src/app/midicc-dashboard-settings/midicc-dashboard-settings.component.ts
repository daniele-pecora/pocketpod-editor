import { Component, OnInit } from '@angular/core';
import { AppGlobalSettingsService, SliderLayoutType } from '../app-global-settings.service';
import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-midicc-dashboard-settings',
  templateUrl: './midicc-dashboard-settings.component.html',
  styleUrls: ['./midicc-dashboard-settings.component.scss']
})
export class MidiccDashboardSettingsComponent implements OnInit {

  get __debug() { return this.appSettings.debug }
  set __debug(value: boolean) { this.appSettings.debug = value }
  get __showSettings() { return this.appSettings.enableSettings }
  set __showSettings(value: boolean) { this.appSettings.enableSettings = value }
  get __useGlobalServiceDevices() { return this.appSettings.useGlobalServiceDevices }
  set __useGlobalServiceDevices(value: boolean) { this.appSettings.useGlobalServiceDevices = value }
  get __useColumns() { return this.appSettings.useColumns }
  set __useColumns(value: boolean) { this.appSettings.useColumns = value }
  get __useRadioGroupInsteadOfDropdown() { return this.appSettings.useRadioGroupInsteadOfDropdown }
  set __useRadioGroupInsteadOfDropdown(value: boolean) { this.appSettings.useRadioGroupInsteadOfDropdown = value }
  get __sliderLayoutType() { return this.appSettings.sliderLayoutType || SliderLayoutType.round }
  set __sliderLayoutType(value: SliderLayoutType) { this.appSettings.sliderLayoutType = value }

  get __useDragAndDrop() { return this.appSettings.dragAndDropEnabled }
  set __useDragAndDrop(value: boolean) { this.appSettings.dragAndDropEnabled = value }

  get __canRestoreLayout() { return this.appSettings.controlsOrder.toString() != AppGlobalSettingsService.DEFAULT_CONTROLS_ORDER.toString() }

  get __logging() { return this.appSettings.logging }
  set __logging(value: boolean) { this.appSettings.logging = value }

  snackBarRef: MatSnackBarRef<SimpleSnackBar>

  constructor(public appSettings: AppGlobalSettingsService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.__useDragAndDrop) {
      this.startRearranging()
    }
  }

  restoreDefaultControlsOrder(event) {
    this.appSettings.controlsOrder = AppGlobalSettingsService.DEFAULT_CONTROLS_ORDER
  }

  startRearranging(event?: any) {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss()
    }
    if (this.__useDragAndDrop) {
      this.snackBarRef = this._snackBar.open('Rearranging MIDI controls layout', 'DONE', {
        verticalPosition: 'bottom'
      })
      this.snackBarRef.onAction().subscribe(() => {
        this.__useDragAndDrop = false
      })
    }
  }
}