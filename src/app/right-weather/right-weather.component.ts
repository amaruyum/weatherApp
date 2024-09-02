import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-right-weather',
  templateUrl: './right-weather.component.html',
  styleUrls: ['./right-weather.component.css']
})
export class RightWeatherComponent implements OnInit {
  today: boolean = true;
  week: boolean = false;
  forecast: any;
  weatherData: any;
  airQuality: any;
  sunrise: string | undefined;
  sunset: string | undefined;

  hourlyForecast: any[] = [];
  dailyForecast: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe(data => {
      if (data) {
        this.weatherData = data;
        this.getForecast(data.coord.lat, data.coord.lon);
        this.getAirQuality(data.coord.lat, data.coord.lon);
        this.getSunriseSunset(data.coord.lat, data.coord.lon);
      }
    });
  }

  getForecast(lat: number, lon: number): void {
    const apiKey = '584a471ebac0caa029abc42f2c8e4623';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    this.http.get(url).subscribe((data: any) => {
      console.log('Forecast Api response', data);
      this.forecast = data;

      this.hourlyForecast = data.list.slice(0, 7); 
      this.dailyForecast = this.filterDailyForecast(data.list);

    });
  }

  filterDailyForecast(data: any[]): any[] {
    const dailyData: any[] = [];
    const seenDates = new Set();
    data.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!seenDates.has(date) && dailyData.length < 5) {
        seenDates.add(date);
        dailyData.push(item);
      }
    });
    return dailyData;
  }
  
  getAirQuality(lat: number, lon: number): void {
    const apiKey = '584a471ebac0caa029abc42f2c8e4623';
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    this.http.get(url).subscribe((data: any) => {
      console.log('Api response 2',data);
      this.airQuality = data;
    });
  }

  getSunriseSunset(lat: number, lon: number): void {
    const apiKey = '584a471ebac0caa029abc42f2c8e4623';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    this.http.get(url).subscribe((data: any) => {
      console.log('Sunrise and Sunset response', data);
      this.sunrise = this.formatTime(data.sys.sunrise);
      this.sunset = this.formatTime(data.sys.sunset);
    });
  }

  formatTime(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onTodayClick(): void {
    this.today = true;
    this.week = false;
  }

  onWeekClick(): void {
    this.today = false;
    this.week = true;
  }
}
