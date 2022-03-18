import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeolocationService } from './geolocation.service';
import { Observable, throwError } from 'rxjs';
//import { environment } from 'src/environments/environment';
import {
  catchError,
  retry
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {
  baseUrl = environment.baseUrl;
  apiKey = environment.apiKey;
  constructor(private httpClient: HttpClient, public geolocationService: GeolocationService) { }

  getUrl(url: any,  token = null) {
    if (token !== null) {
      const httpOptions: Object = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }),
        responseType: 'application/json'
      };
      return this.httpClient.get(url, httpOptions).pipe(catchError(this.handleError.bind(this)))
    } else {
      return this.httpClient.get(url).pipe(catchError(this.handleError.bind(this)));
    }
  }
  handleError(error: any) {
    console.log(error);
    if (error.name == "TimeoutError" || error.message == "Timeout has occurred") {
    } else {

      alert(error.error.error.message);

      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        alert("Please check your Internet connection to continue.");
        alert("Please check your Internet connection to continue.");

        console.error('An error occurred:', error.error);

      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }

    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



  getCurrentWeather(lat: number, lon: number) : Observable<any> {
    return this.getUrl(this.baseUrl + 'lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + this.apiKey);
  }
  getForecastWeather(lat: number, lon: number) : Observable<any>{
    return this.getUrl(this.baseUrl + 'lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + this.apiKey);
  }

}
