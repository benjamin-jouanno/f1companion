import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormulaApiService } from 'src/app/services/formula-api.service';
import { COUNTRIES } from 'src/app/utils/ctryEnum';



@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  flags = COUNTRIES;
  numbers = Array(5).fill(0);
  driverList$: Observable<any> = new Observable();

  @Input() currRace: string = '2023';
  ngOnChanges(changes: SimpleChanges) {
     this.changeSeason(changes.currRace.currentValue);
}

changeSeason(year: string) {
  this.driverList$ = this.formulaApiService.getDrivers();
}

  constructor(private formulaApiService: FormulaApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.driverList$ = this.formulaApiService.getDrivers();
  }

  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfApple = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofApple = Object.values(COUNTRIES)[indexOfApple];
    return valueofApple
  }

  selected(id: string) {
    this.router.navigateByUrl('Driver/' + id).then(() => {
      window.location.reload();
    });
  }
}
