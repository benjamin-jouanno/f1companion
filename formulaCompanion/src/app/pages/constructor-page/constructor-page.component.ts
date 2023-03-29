import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormulaApiService } from 'src/app/services/formula-api.service';

@Component({
  selector: 'app-constructor-page',
  templateUrl: './constructor-page.component.html',
  styleUrls: ['./constructor-page.component.scss']
})
export class ConstructorPageComponent implements OnInit{

  constructors$: Observable<any> = new Observable();

  constructor(private formulaApiService: FormulaApiService)  {
  }

  ngOnInit(): void {
    this.constructors$ = this.formulaApiService.getConstructors();
  }
}
