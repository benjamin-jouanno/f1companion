import { Routes } from "@angular/router";
import { ConstructorPageComponent } from "../pages/constructor-page/constructor-page.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { DriverPageComponent } from "../pages/driver-page/driver-page.component";

export const routesUrls: Routes = [
    { path: 'Dasboard', component: DashboardComponent },
    { path: 'Driver/:id', component: DriverPageComponent },
    { path: 'Constructors', component: ConstructorPageComponent },
    { path: '**', component: DashboardComponent },
]
