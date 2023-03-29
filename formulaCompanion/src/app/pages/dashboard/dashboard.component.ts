import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentSeason: string = '2023';

  seasonChanged(event: any) {
    this.currentSeason = event;
  }

}
