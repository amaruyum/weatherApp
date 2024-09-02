import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightWeatherComponent } from './right-weather.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from '../weather.service';

describe('RightWeatherComponent', () => {
  let component: RightWeatherComponent;
  let fixture: ComponentFixture<RightWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightWeatherComponent ],
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
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
