import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEnv } from '../utils/apiEnv';

const apiEnv = ApiEnv;

@Injectable({
  providedIn: 'root'
})
export class FormulaApiService {
  currentRound: string = 'last';
  currentSeason: string = '2023'
  maxRound: number = 22;
  firstDriver: any;

  drivers$: Observable<any>  = new Observable();
  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>(apiEnv.apiUrl + this.currentSeason + '/last/results' + apiEnv.returnFormat).subscribe(res => {
      this.maxRound = res.MRData.RaceTable.Races[0].round;
    })
    this.getFirstDriver();
  }

  public getDrivers(): Observable<any> {
    this.drivers$ = this.httpClient.get(apiEnv.apiUrl + this.currentSeason + '/drivers' + apiEnv.returnFormat);
    return this.drivers$;
  }

  public getLastRaceResult(): Observable<any> {
    return this.httpClient.get(apiEnv.apiUrl + this.currentSeason + '/' + this.currentRound + '/results' + apiEnv.returnFormat);
  }

  public changeRound(round: number) {
    this.currentRound = round.toString();
    this.changeSeason(+this.currentSeason);
    this.getFirstDriver();
    this.updateMaxRound();
    
  }

  public changeSeason(year: number) {
    this.currentSeason = year.toString();
    this.drivers$ = this.httpClient.get(apiEnv.apiUrl + this.currentSeason + '/drivers' + apiEnv.returnFormat);
  }

  public getMaxRound() {
    return this.maxRound;
  }

  public updateMaxRound() {
    this.httpClient.get<any>(apiEnv.apiUrl + this.currentSeason + '/last/results' + apiEnv.returnFormat).subscribe(res => {
      this.maxRound = res.MRData.RaceTable.Races[0].round;
    })
  }

  public setCurrentRoud() {
    this.currentRound = '1';
  }

  public getFirstDriver(){
    this.httpClient.get<any>(apiEnv.apiUrl + this.currentSeason + '/' + this.currentRound + '/results' + apiEnv.returnFormat).subscribe(res => {
      res.MRData.RaceTable.Races[0].Results.forEach((element: any) => {
        if (element.FastestLap?.rank === '1') {
          this.firstDriver = element;
        }
      });
    });
  }

  public getFastest(): any {
    return this.firstDriver;
  }

  public getAllDrivers(): Observable<any> {
    return this.httpClient.get<any>(apiEnv.apiUrl + 'drivers' + apiEnv.returnFormat + '?limit=1000');
  }

  public getDriverInfos(driverId: string): Observable<any> {
    return this.httpClient.get<any>(apiEnv.apiUrl + 'drivers/' + driverId + apiEnv.returnFormat);
  }

  public getDriverStandings(driverId: string): Observable<any> {
    return this.httpClient.get<any>(apiEnv.apiUrl + 'drivers/' + driverId + '/driverStandings' + apiEnv.returnFormat + '?limit=200');
  }

  public getConstructors(): Observable<any> {
    return this.httpClient.get<any>(apiEnv.apiUrl + 'constructors' + apiEnv.returnFormat + '?limit=1000');
  }

  public getConstructorInfos(constructor: string): Observable<any> {
    return this.httpClient.get<any>(apiEnv.apiUrl + 'constructors/' + constructor + '/drivers' + apiEnv.returnFormat + '?limit=1000')
  }
  public getRaceResult(season:string, circuit: string): Observable<any> {
    return this.httpClient.get<any>(apiEnv.apiUrl + season + '/' + circuit + '/results' + apiEnv.returnFormat);
  }
}
