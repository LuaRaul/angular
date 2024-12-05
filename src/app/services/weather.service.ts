import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
   private apiKey = '20a3e76f553eb5de3f111b928989f9ac';
  constructor(private http:HttpClient) { }
  getWeatherDatas(cityName:string):Observable<any>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`,{})
  }
}
