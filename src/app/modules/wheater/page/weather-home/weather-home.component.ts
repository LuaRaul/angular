import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { WeatherDatas } from 'src/app/modules/interfaces/WeatherDatas';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit,OnDestroy {
  initialCityName= 'São Paulo';
  weatherDatas!:WeatherDatas;
  searchIcon  =faMagnifyingGlass;
  private readonly destroyd$:Subject<void> = new Subject()
  constructor(private weatherService:WeatherService){}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }
   getWeatherDatas(cityName:string):void{
     this.weatherService.getWeatherDatas(cityName)
     .pipe(
      takeUntil(this.destroyd$)
     )
     .subscribe({
        next:(response)=>{
          response &&(this.weatherDatas = response)
          console.log(this.weatherDatas)
        },
        error:(error)=>console.log(error),
     })
   }
   onSubmit():void{
    this.getWeatherDatas(this.initialCityName)
    console.log("CHAMOU A FUNÇÃO");

    this.initialCityName=''
   }
   ngOnDestroy(): void {
      this.destroyd$.next();
      this.destroyd$.complete();
  }
}
