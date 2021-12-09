import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccAppComponent } from './midicc-app.component';

describe('MidiccAppComponent', () => {
  let component: MidiccAppComponent;
  let fixture: ComponentFixture<MidiccAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
