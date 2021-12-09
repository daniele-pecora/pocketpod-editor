import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import WebMidiAPI, { WebMidi } from 'webmidi';

@Injectable({
  providedIn: 'root'
})
export class WebMidiService {

  constructor() { }

  initWebMIDI(logging?: boolean): Observable<WebMidi> {
    return new Observable<WebMidi>((observer) => {
      WebMidiAPI.enable((err) => {
        if (err) {
          if (logging) {
            console.error("WebMidi could not be enabled.", err)
          }
          observer.error(err)
          observer.complete()
        } else {
          if (logging) {
            console.log("WebMidi enabled!")
          }
          observer.next(WebMidiAPI)
          observer.complete()
        }
      }, true)
    })
  }

}
