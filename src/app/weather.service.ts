import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    
    private apikey: string = '584a471ebac0caa029abc42f2c8e4623';
    private citySubject = new BehaviorSubject<string>('Quito');
    private weatherDataSubject = new BehaviorSubject<any>(null);

    city$ = this.citySubject.asObservable();
    weatherData$ = this.weatherDataSubject.asObservable();

    constructor(private http: HttpClient){
        this.loadDefaultWeather();
    }

    setCity(city: string): void {
        this.citySubject.next(city);
        this.getWeatherData(city).subscribe(data => {
        this.weatherDataSubject.next(data);
        });
    }

    private loadDefaultWeather(): void {
        this.getWeatherData(this.citySubject.value).subscribe(data => {
        this.weatherDataSubject.next(data);
        });
    }

    private getWeatherData(city: string): Observable<any> {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}&units=metric`;
        return this.http.get(url);
    }
}
