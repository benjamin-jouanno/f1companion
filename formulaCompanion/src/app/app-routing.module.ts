import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesUrls } from './utils/routes';

const routes: Routes = routesUrls;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
