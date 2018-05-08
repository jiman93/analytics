import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { HttpService } from './services/http.service';
import { httpServiceFactory } from './services/http-service.factory';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NotificationService } from './common/NotificationService';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, XHRBackend, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FloatLabelType, MAT_LABEL_GLOBAL_OPTIONS, LabelOptions, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { ErrorDialogComponent } from "./components/common/error-dialog/error-dialog.component";
import { InfoDialogComponent } from './components/common/info-dialog/info-dialog.component';
import { ShipReadinessComponent } from './components/ship-readiness/ship-readiness.component';
import { ShipDashboardComponent } from './components/ship-readiness/ship-dashboard/ship-dashboard.component';
import { ShipListComponent } from './components/ship-readiness/ship-list/ship-list.component';
import { MaintenanceStatusComponent } from './components/maintenance-status/maintenance-status.component';
import { MaintenanceDashboardComponent } from './components/maintenance-status/maintenance-dashboard/maintenance-dashboard.component';
import { MaintenanceDetailsComponent } from './components/maintenance-status/maintenance-details/maintenance-details.component';
import { ShipOverallReadinessDashboardComponent } from './components/ship-readiness/ship-overall-readiness-dashboard/ship-overall-readiness-dashboard.component';
import { ShipJobtypeDashboardComponent } from './components/ship-readiness/ship-jobtype-dashboard/ship-jobtype-dashboard.component';
import { ShipOverallReadinessTableComponent } from './components/ship-readiness/ship-overall-readiness-table/ship-overall-readiness-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    InfoDialogComponent,    
    ShipReadinessComponent,
    ShipDashboardComponent,
    ShipListComponent,
    MaintenanceStatusComponent,
    MaintenanceDashboardComponent,
    MaintenanceDetailsComponent,
    ShipOverallReadinessDashboardComponent,
    ShipJobtypeDashboardComponent,
    ShipOverallReadinessTableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [
    NotificationService,
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    {provide: MAT_DATE_LOCALE, useValue: 'en-au'},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }
  ],
  entryComponents: [
    ErrorDialogComponent,
    InfoDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
