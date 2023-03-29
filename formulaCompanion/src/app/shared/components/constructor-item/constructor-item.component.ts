import { Component, Input, OnInit } from '@angular/core';
import { COUNTRIES } from 'src/app/utils/ctryEnum';
import { TEAM_COLOR } from 'src/app/utils/teamColorEnum';

@Component({
  selector: 'app-constructor-item',
  templateUrl: './constructor-item.component.html',
  styleUrls: ['./constructor-item.component.scss']
})


export class ConstructorItemComponent implements OnInit {

  @Input() item: any = {};
  visible: boolean = false;
  constructor() { }


  ngOnInit(): void {
  }

  getFlag(nationality: string): string {
    nationality = nationality.replace(/\s/g, "");
    const indexOfCtry = Object.keys(COUNTRIES).indexOf(nationality);
    const valueofCtry = Object.values(COUNTRIES)[indexOfCtry];
    return valueofCtry
  }

  showDialog() {
    this.visible = true;
}

getColor(id: string) {
  id = id.replace('-', '_');
  const indexOfCtry = Object.keys(TEAM_COLOR).indexOf(id);
  const valueofCtry = Object.values(TEAM_COLOR)[indexOfCtry];
  return valueofCtry
}

}
