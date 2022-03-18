import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private httpClient: HttpClient) { }
  geolocationPosition:any;
  userIP: string = "";


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



  private loadIp(): any {
    this.getUrl('https://jsonip.com').subscribe(
      (value:any) => {
        this.userIP = value.ip;
        return this.userIP;
      });

  }

  getLocationUsingIP(): Observable<any> {
    this.loadIp();
    return this.getUrl('https://ipapi.co/' + this.userIP + '/json/');
  }

}
