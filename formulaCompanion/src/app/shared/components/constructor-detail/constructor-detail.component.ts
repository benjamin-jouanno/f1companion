import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormulaApiService } from 'src/app/services/formula-api.service';
import { COUNTRIES } from 'src/app/utils/ctryEnum';
import { TEAM_COLOR } from 'src/app/utils/teamColorEnum';

@Component({
  selector: 'app-constructor-detail',
  templateUrl: './constructor-detail.component.html',
  styleUrls: ['./constructor-detail.component.scss']
})
export class ConstructorDetailComponent implements OnInit{

  @Input()item: any = null;

  infos$: Observable<any> = new Observable();

  constructor(private formulaApiService:FormulaApiService) {}

  ngOnInit(): void {
    this.infos$ = this.formulaApiService.getConstructorInfos(this.item?.constructorId);
  }

  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfCtry = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofCtry = Object.values(COUNTRIES)[indexOfCtry];
    return valueofCtry
  }

  getColor(id: string) {
    id = id.replace('-', '_');
    const indexOfCtry = Object.keys(TEAM_COLOR).indexOf(id);
    const valueofCtry = Object.values(TEAM_COLOR)[indexOfCtry];
    return valueofCtry
  }

}
