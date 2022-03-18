import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/service/geolocation.service';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data : any;
  countryData: any;
  temperatureDataFeelsLike: number =0;
  temperatureData: number =0;
  showFahrenheit: boolean =false;
  showCelsius: boolean = true;
  symbol : String = '°C';
  minimumTemperature: number = 0;
  maximumTemperature: number = 0;

  constructor(private geolocationService: GeolocationService, private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.geolocationService.getLocationUsingIP().subscribe( (value:any) => {
      this.countryData = value;
      console.log(this.countryData)

      this.weatherService.getCurrentWeather(value.latitude, value.longitude).subscribe( (value:any) => {
        this.data = value;
        this.temperatureData = this.data.main.temp;
        this.temperatureDataFeelsLike = this.data.main.temp_min;
        this.minimumTemperature = this.data.main.temp_max;
        this.temperatureDataFeelsLike = this.data.main.feels_like;
        console.log(this.data);
      }
      )
    },
    (error: string) => {
      alert(error);
      return error;
    }
    );
  }
  toggle(value: any){
    if(value.target.checked){
     this.temperatureData =  this.getWeatherInFahrenheit(this.temperatureData);
     this.temperatureDataFeelsLike =  this.getWeatherInFahrenheit(this.temperatureDataFeelsLike);
     this.showFahrenheit = true;
     this.showSymbol();
    }
    else{
      this.temperatureData =  this.getWeatherInCelsius(this.temperatureData);
      this.temperatureDataFeelsLike =  this.getWeatherInCelsius(this.temperatureDataFeelsLike);
      this.showFahrenheit = false;
      this.showSymbol();
    }
  }

  getWeatherInFahrenheit( temperature: number): number{
    let temInFahrenheit = temperature * (9/5) + 32;
    return Number(temInFahrenheit.toFixed(2));
  }

  getWeatherInCelsius( temperature: number): number{
    let tempInCelsius = (temperature - 32) * (5/9);
    return Number(tempInCelsius.toFixed(2));
  }

  showSymbol(){
    if(this.showFahrenheit){
      this.symbol = '°F';
    }
    else{
      this.symbol = '°C';
    }
  }

}
