import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccDeviceSelectorComponent } from './midicc-device-selector.component';

describe('MidiccDeviceSelectorComponent', () => {
  let component: MidiccDeviceSelectorComponent;
  let fixture: ComponentFixture<MidiccDeviceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccDeviceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccDeviceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
