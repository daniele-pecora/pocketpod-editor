import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiSysexComponent } from './midi-sysex.component';

describe('MidiSysexComponent', () => {
  let component: MidiSysexComponent;
  let fixture: ComponentFixture<MidiSysexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiSysexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiSysexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
