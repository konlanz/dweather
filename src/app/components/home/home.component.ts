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
  countryData: any;
  tempratureDataFeelsLike: number =0;
  tempratureData: number =0;
  showFarihient: boolean =false;
  showCelcius: boolean = true;
  sybol : String = '°C';

  constructor(private geolocationService: GeolocationService, private weatherservice: WeatherserviceService) { }

  ngOnInit(): void {
    this.getdata()
  }
  getdata(){
    this.geolocationService.getLocationUsingIP().subscribe( (value:any) => {
      this.countryData = value;
      console.log(this.countryData)
      this.weatherservice.getCurrentWeather(value.latitude, value.longitude).subscribe( (value:any) => {
        this.data = value;
        this.tempratureDataFeelsLike = this.data.main.feels_like;
        this.tempratureData = this.data.main.temp;
        console.log(this.data);
      }
      )
    },
    (error:any) => {
      return error;
    }
    );
  }

  toogle(value: any){
    if(value.target.checked){
     this.tempratureData =  this.getWeatherInFarihient(this.tempratureData);
     this.tempratureDataFeelsLike =  this.getWeatherInFarihient(this.tempratureDataFeelsLike);
     this.showFarihient = true;
     this.showSymbol();
    }
    else{
      this.tempratureData =  this.getWeatherInCelcius(this.tempratureData);
      this.tempratureDataFeelsLike =  this.getWeatherInCelcius(this.tempratureDataFeelsLike);
      this.showFarihient = false;
      this.showSymbol();
    }
  }

  getWeatherInFarihient( temperature: number): number{
    let temInFarihient = temperature * (9/5) + 32;
    return Number(temInFarihient.toFixed(2));
  }

  getWeatherInCelcius( temperature: number): number{
    let tempInCelcius = (temperature - 32) * (5/9);
    return Number(tempInCelcius.toFixed(2));
  }

  showSymbol(){
    if(this.showFarihient == true){
      this.sybol = '°F';
    }
    else{
      this.sybol = '°C';
    }
  }

}
