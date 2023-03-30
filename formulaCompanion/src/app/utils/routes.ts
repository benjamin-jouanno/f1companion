import { Routes } from "@angular/router";
import { ConstructorPageComponent } from "../pages/constructor-page/constructor-page.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { DriverPageComponent } from "../pages/driver-page/driver-page.component";
import { WelcomePageComponent } from "../pages/welcome-page/welcome-page.component";

export const routesUrls: Routes = [
    { path: 'Driver/:id', component: DriverPageComponent },
    { path: 'Constructors', component: ConstructorPageComponent },
    { path: 'Dashboard', component: DashboardComponent },
    { path: '**', component: WelcomePageComponent },
]
