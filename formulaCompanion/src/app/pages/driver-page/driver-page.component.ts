import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaApiService } from 'src/app/services/formula-api.service';
import { COUNTRIES } from 'src/app/utils/ctryEnum';
import { TEAM_COLOR } from 'src/app/utils/teamColorEnum';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.scss']
})
export class DriverPageComponent implements OnInit {

  id: string | null = '';
  driver: any;
  standings: any;
  constructor(private route: ActivatedRoute, private formulaApiService: FormulaApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.formulaApiService.getDriverInfos(this.id ? this.id : '').subscribe(res => {
      this.driver = res.MRData.DriverTable.Drivers[0];
    });
    this.getStandings();
  }
  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfCtry = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofCtry = Object.values(COUNTRIES)[indexOfCtry];
    return valueofCtry
  }

  getStandings() {
    this.formulaApiService.getDriverStandings(this.id ? this.id : '').subscribe(res => {
      this.standings = res.MRData.StandingsTable.StandingsLists;
    })
  }

  getLastConstructor(): string {
    return this.standings[this.standings.length - 1]?.DriverStandings[0].Constructors[0].constructorId;
  }
  getLastConstructorName(): string {
    return this.standings[this.standings.length - 1]?.DriverStandings[0].Constructors[0].name;
  }

  getWT(): number {
    let wins = 0;
    this.standings?.forEach((element: any) => {
      if (element.DriverStandings[0].position === '1') {
        wins++;
      }
    })
    return wins;
  }

  getRaceWinned(): number {
    let wins = 0;
    this.standings?.forEach((element: any) => {
      element.DriverStandings.forEach((race: any) => {
        wins += +race.wins;
      })
    })
    return wins;
  }
  getSeasonsRaced(): number {
    return this.standings?.length;
  }

  getColor(id: string) {
    id = id.replace('-', '_');
    const indexOfCtry = Object.keys(TEAM_COLOR).indexOf(id);
    const valueofCtry = Object.values(TEAM_COLOR)[indexOfCtry];
    return valueofCtry
  }
}
