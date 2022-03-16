import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private httpClient: HttpClient) { }
  geolocationPosition:any;
  userIP: string = "";

  private loadIp(): any {
    this.httpClient.get('https://jsonip.com').subscribe(
      (value:any) => {
        this.userIP = value.ip;
        return this.userIP;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  }

  getLocationUsingIP(): Observable<any> {
    this.loadIp();
      return this.httpClient.get('https://ipapi.co/' + this.userIP + '/json/');
  }

}
