import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormulaApiService } from 'src/app/services/formula-api.service';
import { COUNTRIES } from 'src/app/utils/ctryEnum';
import { Seasons } from 'src/app/utils/seasons';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})

export class HeaderBarComponent implements OnInit {
  seasons: string[] = Seasons.reverse();
  drivers: any[] = [];
  optionDrivers: any = [];
  optionFiltered: any = [];
  selectedItem: any;
  @Output() seasonChange = new EventEmitter<string>();

  constructor(private formulaApiService: FormulaApiService, private router: Router) { }
  ngOnInit(): void {
    this.formulaApiService.getAllDrivers().subscribe(res => {
      this.drivers = res.MRData.DriverTable.Drivers;
      this.drivers.forEach((elem: any) => {
        const temp = {
          label: elem.givenName + ' ' + elem.familyName,
          value: elem.driverId,
          nationality: elem.nationality,
        };
        this.optionDrivers.push(temp);
      })
    });
  }

  onChange(event: any) {
    let season = event.value;
    this.formulaApiService.changeSeason(season);
    this.seasonChange.emit(season);
  }

  search(event: { query: any; }) {
    this.optionFiltered = this.optionDrivers?.filter((c: any) => c.value.includes(event.query));
  }

  selected(event: any) {
    console.log(event.value);
    this.router.navigateByUrl('Driver/' + event.value).then(() => {
      window.location.reload();
    });
  }

  goHome() {
    this.router.navigateByUrl('Dashboard');
  }

  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfCtry = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofCtry = Object.values(COUNTRIES)[indexOfCtry];
    return valueofCtry
  }
}
