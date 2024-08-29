import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightWeatherComponent } from './right-weather.component';

describe('RightWeatherComponent', () => {
  let component: RightWeatherComponent;
  let fixture: ComponentFixture<RightWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
