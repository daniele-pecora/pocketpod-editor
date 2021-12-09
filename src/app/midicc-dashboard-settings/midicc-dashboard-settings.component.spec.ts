import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccDashboardSettingsComponent } from './midicc-dashboard-settings.component';

describe('MidiccDashboardSettingsComponent', () => {
  let component: MidiccDashboardSettingsComponent;
  let fixture: ComponentFixture<MidiccDashboardSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccDashboardSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccDashboardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
