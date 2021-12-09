import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccProgramComponent } from './midicc-program.component';

describe('MidiccProgramComponent', () => {
  let component: MidiccProgramComponent;
  let fixture: ComponentFixture<MidiccProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
