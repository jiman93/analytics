import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { HttpService } from './services/http.service';
import { httpServiceFactory } from './services/http-service.factory';
import { TreeModule } from 'angular-tree-component';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NotificationService } from './common/NotificationService';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, XHRBackend, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { FloatLabelType, MAT_LABEL_GLOBAL_OPTIONS, LabelOptions } from '@angular/material/core';
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
import { JrListComponent } from './components/jobrequest/jr-list/jr-list.component';
import { JrCreateComponent } from './components/jobrequest/jr-create/jr-create.component';
import { JrCreateDetailsComponent } from './components/jobrequest/jr-create/jr-create-details/jr-create-details.component';
import { JrCreateAtachmentsComponent } from './components/jobrequest/jr-create/jr-create-atachments/jr-create-atachments.component';
import { JrCreateDetailsTab2Component } from './components/jobrequest/jr-create/jr-create-details/jr-create-details-tab2/jr-create-details-tab2.component';
import { JsonViewerComponent } from './components/common/json-viewer/json-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    JrListComponent,
    JrCreateComponent,
    JrCreateDetailsComponent,
    JrCreateAtachmentsComponent,
    JrCreateDetailsTab2Component,
    JsonViewerComponent
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
    TreeModule
  ],
  providers: [
    NotificationService,
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }

  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
