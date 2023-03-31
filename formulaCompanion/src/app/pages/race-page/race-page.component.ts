import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormulaApiService } from 'src/app/services/formula-api.service';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { COUNTRIES } from 'src/app/utils/ctryEnum';
import { Icons } from 'src/app/utils/icons';

@Component({
  selector: 'app-race-page',
  templateUrl: './race-page.component.html',
  styleUrls: ['./race-page.component.scss']
})
export class RacePageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private formulaApiService: FormulaApiService, private weatherApiService: WeatherApiService) { }
  id: string | null = '';
  cid: string | null = '';
  raceResult$: Observable<any> = new Observable();
  weather$: Observable<any> = new Observable();
  weatherHours: string[] = [];
  rainHours: string[] = [];
  cloudHours: string[] = [];
  cloud = 0;
  rain = 0;
  weather = 0;
  icons = Icons;
  raceHour: string = '0';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cid = this.route.snapshot.paramMap.get('cid');
    this.raceResult$ = this.formulaApiService.getRaceResult(this.id ? this.id : '', this.cid ? this.cid : '');
    this.raceResult$.subscribe(res  => {
      let data = res.MRData.RaceTable.Races[0];
      let lat = +data.Circuit.Location.lat;
      let long = +data.Circuit.Location.long;
      let date = data.date;
      this.raceHour = data.time ? data.time : '13';
      this.weather$ = this.weatherApiService.getRaceWeather(lat.toFixed(2).toString(), long.toFixed(2).toString(), date.toString());
      this.weather$.subscribe(res => {
        const data = res.hourly;
          for (let i = 0; i <= 23; i++) {
            this.weatherHours.push(data.temperature_2m[i]);
            this.rainHours.push(data.rain[i]);
            this.cloudHours.push(data.cloudcover[i]);
          }
          this.getRaceCloud();
          this.getRaceRain();
          this.getRaceTemp();
      })
    })
  }

  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfCtry = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofCtry = Object.values(COUNTRIES)[indexOfCtry];
    return valueofCtry
  }

  getRaceTemp(): string {
    const hour = +this.raceHour.slice(0, 2);
    this.weather = +this.weatherHours[hour];
    return this.weatherHours[hour];
  }

  getRaceRain(): string {
    const hour = +this.raceHour.slice(0, 2);
    this.rain = +this.rainHours[hour];
    return this.rainHours[hour];
  }

  getRaceCloud(): string {
    const hour = +this.raceHour.slice(0, 2);
    this.cloud = +this.cloudHours[hour];
    return this.cloudHours[hour];
  }

  getDate(date: string): Date {
    return new Date(Date.parse(date));
  }

  getHour(date: string, hour: string): Date {
    if (!hour) {
      return new Date(Date.parse(date));
    }
    const currentDate = date + ' ' + hour;
    return new Date(Date.parse(currentDate));
  }

  getOvercast(): any {
    console.log(this.raceHour)
    if (this.cloud === 0 && this.rain === 0 && +this.raceHour.slice(0, 2) < 17) {
      return this.icons.faSun;
    }
    else if (this.cloud > 0 && this.rain === 0 && +this.raceHour.slice(0, 2) < 17) {
      return this.icons.faCloud;
    }
    else if (this.cloud > 0 && this.rain > 0 && +this.raceHour.slice(0, 2) < 17) {
      return this.icons.faCloudShowersHeavy;
    }
    else if (this.cloud === 0 && this.rain === 0 && +this.raceHour.slice(0, 2) >= 17) {
      return this.icons.faMoon;
    }
    else if (this.cloud > 0 && this.rain > 0 && +this.raceHour.slice(0, 2) >= 17) {
      return this.icons.faCloudMoonRain;
    }
  }
}
