import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccControlComponent } from './midicc-control.component';

describe('MidiccControlComponent', () => {
  let component: MidiccControlComponent;
  let fixture: ComponentFixture<MidiccControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
