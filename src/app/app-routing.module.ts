import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MidiccAppComponent } from './midicc-app/midicc-app.component'

const routes: Routes = [
  { path: '', component: MidiccAppComponent }
  // { path: '', redirectTo: '/app', pathMatch: 'full' },
  // { path: 'app', component: MidiccAppComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
