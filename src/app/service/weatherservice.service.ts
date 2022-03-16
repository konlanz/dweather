import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from './geolocation.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {
  constructor(private http: HttpClient, public geolocationService: GeolocationService) { }


  getCurrentWeather(lat: number, lon: number) : Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=ecfaf72b8f4cc2c771bde07722ca5114');
  }
  getForecastWeather(lat: number, lon: number) : Observable<any>{
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=ecfaf72b8f4cc2c771bde07722ca5114');
  }

}
