import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSliderComponent } from './round-slider.component';

describe('RoundSliderComponent', () => {
  let component: RoundSliderComponent;
  let fixture: ComponentFixture<RoundSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
