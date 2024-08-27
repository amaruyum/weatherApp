import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    apiKey ='584a471ebac0caa029abc42f2c8e4623';

    constructor(private http:HttpClient){}

    getWeather(city: string){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
        return this.http.get(apiUrl);
    }
}
