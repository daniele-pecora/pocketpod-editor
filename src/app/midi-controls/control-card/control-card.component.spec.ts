import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCardComponent } from './control-card.component';

describe('ControlCardComponent', () => {
  let component: ControlCardComponent;
  let fixture: ComponentFixture<ControlCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
