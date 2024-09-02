import { Component, OnInit} from '@angular/core';
import { WeatherService } from '../weather.service';
import { ICON_MAPPING } from '../img-mapping/img-mapping';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit{
  city: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe(
      data => {
      this.weatherData = data;
    },
    error => {
      console.error('Error fetching weather data:', error);
    });
    
    this.weatherService.city$.subscribe(city => {
      this.city = city;
    });
  }

  getWeather(): void {
    if (this.city) {
      this.weatherService.setCity(this.city);
    }
  }

  getWeatherIcon(): string {
    if (this.weatherData && this.weatherData.weather && this.weatherData.weather[0]) {
      const iconCode = this.weatherData.weather[0].icon;
      console.log('Icon Code:', iconCode);
      return ICON_MAPPING[iconCode] || ICON_MAPPING['default'];
    }
    return ICON_MAPPING['default']; 
  }
}
