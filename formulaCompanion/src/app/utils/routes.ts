import { Routes } from "@angular/router";
import { ConstructorPageComponent } from "../pages/constructor-page/constructor-page.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { DownPageComponent } from "../pages/down-page/down-page.component";
import { DriverPageComponent } from "../pages/driver-page/driver-page.component";
import { RacePageComponent } from "../pages/race-page/race-page.component";
import { WelcomePageComponent } from "../pages/welcome-page/welcome-page.component";
import { IsupGuard } from "./isUp-guard";

export const routesUrls: Routes = [
    { path: 'Driver/:id', component: DriverPageComponent },
    { path: 'ko', component: DownPageComponent },
    { path: 'Constructors', component: ConstructorPageComponent,  },
    { path: 'Dashboard', component: DashboardComponent,  },
    { path: 'Race/:id/:cid', component: RacePageComponent  },
    { path: '**', component: WelcomePageComponent  },
]
