import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEnv } from '../utils/apiEnv';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private httpClient: HttpClient) { }

  getRaceWeather(lat: string, long: string, date: string): Observable<any> {
    return this.httpClient.get<any>(ApiEnv.weatherUrl + '?latitude='+ lat + '&longitude=' + long + '&start_date=' + date + '&end_date=' + date + '&hourly=temperature_2m,rain,cloudcover');
  }
}
