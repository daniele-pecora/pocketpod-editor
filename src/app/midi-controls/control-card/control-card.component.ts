import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppGlobalSettingsService } from 'src/app/app-global-settings.service';

@Component({
  selector: 'app-control-card',
  templateUrl: './control-card.component.html',
  styleUrls: ['./control-card.component.scss'],
  host: {
    '[class.card-dim-mobile-device]': 'isMobileDevice'
  },
})
export class ControlCardComponent implements OnInit, OnChanges {

  @Input()
  Title: string
  @Input()
  Subtitle: string
  @Input()
  Autosize: boolean | AutosizeVal
  /**
   * Any user defined note
   */
  @Input()
  Note: string

  @Input()
  ShowDragHandle: boolean
  showDragHandle: boolean = this.ShowDragHandle

  header
  subHeader

  /**
   * TODO Layout settings
   */
  // cardsForMobile = this.appGlobalSettingsService.cardsFullwithOnMobile
  appSettings_cardsForMobile = false

  get isMobileDevice() { return this.globalSettings.deviceDetectorService.isMobileDevice() }

  constructor(private globalSettings: AppGlobalSettingsService) {

  }

  ngOnInit() {
    this.header = this.Title
    this.subHeader = this.Subtitle
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Title) {
      if (changes.Title.currentValue !== changes.Title.previousValue) {
        this.header = changes.Title.currentValue
      }
    }
    if (changes.Subtitle) {
      if (changes.Subtitle.currentValue !== changes.Subtitle.previousValue) {
        this.subHeader = changes.Subtitle.currentValue
      }
    }
    if (changes.ShowDragHandle) {
      if (changes.ShowDragHandle.currentValue !== changes.ShowDragHandle.previousValue) {
        this.showDragHandle = changes.ShowDragHandle.currentValue
      }
    }
  }
}

export enum AutosizeVal {
  width = 'width',
  height = 'height',
  both = 'both'
}