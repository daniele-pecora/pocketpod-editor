import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccDashboardComponent } from './midicc-dashboard.component';

describe('MidiccDashboardComponent', () => {
  let component: MidiccDashboardComponent;
  let fixture: ComponentFixture<MidiccDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
