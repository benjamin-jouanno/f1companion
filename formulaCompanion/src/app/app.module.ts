import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DriversListComponent } from './shared/components/drivers-list/drivers-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {PanelModule} from 'primeng/panel';

import { ChipModule } from 'primeng/chip';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LastRaceComponent } from './shared/components/last-race/last-race.component';
import { TagModule } from 'primeng/tag';
import { ImgFallbackDirective } from './shared/directives/img-fallback.directive';
import { HeaderBarComponent } from './shared/components/header-bar/header-bar.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DriverPageComponent } from './pages/driver-page/driver-page.component';
import { ConstructorPageComponent } from './pages/constructor-page/constructor-page.component';
import { ConstructorItemComponent } from './shared/components/constructor-item/constructor-item.component';
import { DialogModule } from 'primeng/dialog';
import { ConstructorDetailComponent } from './shared/components/constructor-detail/constructor-detail.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AppComponent,
    DriversListComponent,
    DashboardComponent,
    LastRaceComponent,
    ImgFallbackDirective,
    HeaderBarComponent,
    DriverPageComponent,
    ConstructorPageComponent,
    ConstructorItemComponent,
    ConstructorDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PanelModule,
    ChipModule,
    ProgressSpinnerModule,
    TagModule,
    AutoCompleteModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    SkeletonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
