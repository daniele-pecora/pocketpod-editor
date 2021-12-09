import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatSelectModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule /** is required to apply custom theme background color to the page */
    , MatListModule
    , MatSnackBarModule
  ]
})
export class UiWidgetsModuleAngularMaterial { }
