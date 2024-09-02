import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should fetch default weather data on creation', () => {
    const dummyWeatherData = { weather: [{ description: 'clear sky' }], main: { temp: 20 } };

    // Intercepta la solicitud HTTP que se realiza cuando se carga el servicio
    const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/weather?q=Quito&appid=584a471ebac0caa029abc42f2c8e4623&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyWeatherData); // Simula la respuesta de la API

    service.weatherData$.subscribe(data => {
      expect(data).toEqual(dummyWeatherData);
    });
  });
});
