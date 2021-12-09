import { Component, OnInit, Inject } from '@angular/core';
import { AppGlobalSettingsService } from '../app-global-settings.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-midicc-app',
  templateUrl: './midicc-app.component.html',
  styleUrls: ['./midicc-app.component.scss']
})
export class MidiccAppComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, public appSettings: AppGlobalSettingsService) { }

  ngOnInit(): void {

  }

  reload() {
    this.document.defaultView.location.reload()
  }

  share() {
    const home_page = 'https://pocket-pod.web.app' // ${this.document.defaultView.location.href}
    const text = encodeURIComponent(`I just had fun editing my Line 6 Pocked POD online with "PocketPOD Editor Online" 🎉😎 Homepage: ${home_page}`)
    const url = `https://twitter.com/intent/tweet?text=${text}`
    let fenster = this.document.defaultView.open(url, "Please share", "width=600,height=400,status=yes,scrollbars=yes,resizable=yes")
    fenster.focus()
  }
}
