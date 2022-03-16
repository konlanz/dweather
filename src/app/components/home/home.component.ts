import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/service/geolocation.service';
import { WeatherserviceService } from 'src/app/service/weatherservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data : any;
  constructor(private geolocationService: GeolocationService, private weatherservice: WeatherserviceService) { }

  ngOnInit(): void {
    this.getdata()
  }
  getdata(){
    this.geolocationService.getLocationUsingIP().subscribe( (value:any) => {
      this.weatherservice.getCurrentWeather(value.latitude, value.longitude).subscribe( (value:any) => {
        this.data = value;
      }
      )
    },
    (error:any) => {
      return error;
    }
    );
  }
}
