import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { AppOfflineService } from './app-offline.service'
import { LOCALE_ID } from '@angular/core'
import { ErrorHandler } from '@angular/core'
import { AppErrorHandler } from './app.errorhandler'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { UiWidgetsModuleAngularMaterial } from './ui-widgets/ui-widgets.module-angular-material'
// DON'T USE ALL WIDGETS NOW! import { UIWidgetsMaterialModule} from './ui-widgets/ui-widgets.full-material-module'
import { MidiccDashboardComponent } from './midicc-dashboard/midicc-dashboard.component'

import { DragulaModule } from 'ng2-dragula'

import {
  MidiccProgramComponent
  , MidiccModelsComponent
  , MidiccDeviceSelectorComponent
  , MidiccControlComponent
  , MidiSysexComponent
  , ControlCardComponent
  , RoundSliderComponent
} from './midi-controls';
import { MidiccDashboardSettingsComponent } from './midicc-dashboard-settings/midicc-dashboard-settings.component';
import { MidiccAppComponent } from './midicc-app/midicc-app.component'


@NgModule({
  declarations: [
    AppComponent,
    MidiccDashboardComponent,
    MidiccProgramComponent,
    MidiccModelsComponent,
    MidiccDeviceSelectorComponent,
    MidiccControlComponent,
    ControlCardComponent,
    MidiSysexComponent,
    RoundSliderComponent,
    MidiccDashboardSettingsComponent,
    MidiccAppComponent
  ],
  imports: [ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production}),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    UiWidgetsModuleAngularMaterial,
    DragulaModule.forRoot()
  ],
  providers: [AppOfflineService, { provide: LOCALE_ID, useValue: 'de-DE' /**required for the date format pipe*/ }, { provide: ErrorHandler, useClass: AppErrorHandler },],
  bootstrap: [AppComponent]
})
export class AppModule { }
