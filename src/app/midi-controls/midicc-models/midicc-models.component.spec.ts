import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiccModelsComponent } from './midicc-models.component';

describe('MidiccModelsComponent', () => {
  let component: MidiccModelsComponent;
  let fixture: ComponentFixture<MidiccModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiccModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiccModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
