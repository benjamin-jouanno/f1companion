import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormulaApiService } from 'src/app/services/formula-api.service';
import { COUNTRIES } from 'src/app/utils/ctryEnum';
import { TEAM_COLOR } from 'src/app/utils/teamColorEnum';

@Component({
  selector: 'app-last-race',
  templateUrl: './last-race.component.html',
  styleUrls: ['./last-race.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LastRaceComponent implements OnInit {

  lastRaceResult$: Observable<any> = new Observable();
  firstDriver: any;
  maxDisplay: number = 6;

  @Input() currRace: string = '2023';
  ngOnChanges(changes: SimpleChanges) {
     this.changeSeason(changes.currRace.currentValue);
}
  constructor(public formulaApiService: FormulaApiService, private router:Router) { }

  ngOnInit(): void {
    this.lastRaceResult$ = this.formulaApiService.getLastRaceResult();
    this.formulaApiService.getFirstDriver();
    this.firstDriver = this.formulaApiService.getFastest();
  }

  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfCtry = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofCtry = Object.values(COUNTRIES)[indexOfCtry];
    return valueofCtry
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

  nextRound(round: string) {
    if (round === this.formulaApiService.getMaxRound().toString()) {
      return;
    }
    this.formulaApiService.changeRound(+round + 1);
    this.lastRaceResult$ = this.formulaApiService.getLastRaceResult();
    this.formulaApiService.getFirstDriver();
    this.firstDriver = this.formulaApiService.getFastest();
  }

  previousRound(round: string) {
    if (round === '1') {
      return;
    }
    this.formulaApiService.changeRound(+round - 1);
    this.lastRaceResult$ = this.formulaApiService.getLastRaceResult();
    this.formulaApiService.getFirstDriver();
    this.firstDriver = this.formulaApiService.getFastest();
  }

  nextSeason(year: string) {
    if (year === "2023") {
      return;
    }
    this.formulaApiService.setCurrentRoud();
    this.formulaApiService.changeSeason(+year + 1);
    this.lastRaceResult$ = this.formulaApiService.getLastRaceResult();
    this.formulaApiService.getFirstDriver();
    this.firstDriver = this.formulaApiService.getFastest();
    this.formulaApiService.updateMaxRound();
  }

  changeSeason(year: string) {
    this.formulaApiService.setCurrentRoud();
    this.formulaApiService.changeSeason(+year);
    this.lastRaceResult$ = this.formulaApiService.getLastRaceResult();
    this.formulaApiService.getFirstDriver();
    this.firstDriver = this.formulaApiService.getFastest();
    this.formulaApiService.updateMaxRound();
  }

  previousSeason(year: string) {
    if (year === "1950") {
      return;
    }
    this.formulaApiService.setCurrentRoud();
    this.formulaApiService.changeSeason(+year - 1);
    this.lastRaceResult$ = this.formulaApiService.getLastRaceResult();
    this.formulaApiService.getFirstDriver();
    this.formulaApiService.updateMaxRound();
  }

  getMaxRound(): string {
    return this.formulaApiService.getMaxRound().toString();
  }

  getDuration(time: string) {
    const newTime = new Date(+time);
    return ((newTime.getHours() - 1).toString() + 'h ' + newTime.getMinutes().toString() + 'm ' + newTime.getSeconds().toString() + 's');
  }

  getFastestDriver() {

  }

  goToDriver(id: string) {
    this.router.navigateByUrl('/Driver/' + id);
  }

  expand() {
    if (this.maxDisplay === 6) {
      this.maxDisplay = 25;
    }
    else {
      this.maxDisplay = 6;
    }
  }

  selected(id: string) {
    this.router.navigateByUrl('Driver/' + id).then(() => {
      window.location.reload();
    });
  }

  getColor(id: string) {
    id = id.replace('-', '_');
    const indexOfCtry = Object.keys(TEAM_COLOR).indexOf(id);
    const valueofCtry = Object.values(TEAM_COLOR)[indexOfCtry];
    return valueofCtry
  }

  raceDetails(id: string, cid: string) {
    this.router.navigateByUrl('/Race/' + id + '/' + cid);
  }

}
