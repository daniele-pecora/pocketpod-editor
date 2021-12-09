import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  touchDevice: boolean
  mobileDevice: boolean

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.touchDevice = this.isTouchDevice()
    this.mobileDevice = this.isMobileDevice()
  }

  isTouchDevice(): boolean {
    const touch = !!('ontouchstart' in this.document.defaultView // window        // works on most browsers 
      || 'onmsgesturechange' in this.document.defaultView // window // works on IE10 with some false positives
      || navigator.maxTouchPoints
    )
    return touch
  }

  isMobileDevice(): boolean {
    const deviceAgent = this.document.defaultView.navigator.userAgent.toLowerCase();
    const isMobileDevice =
      (deviceAgent.match(/(iphone|ipod|ipad)/) ||
        deviceAgent.match(/(android)/) ||
        deviceAgent.match(/(iemobile)/) ||
        deviceAgent.match(/iphone/i) ||
        deviceAgent.match(/ipad/i) ||
        deviceAgent.match(/ipod/i) ||
        deviceAgent.match(/blackberry/i) ||
        deviceAgent.match(/bada/i))
    const val = !!(isMobileDevice)
    // console.log('isMobileDevice:', val, deviceAgent)
    return val
  }
}
