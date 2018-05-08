import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipReadinessComponent } from './components/ship-readiness/ship-readiness.component';
import { MaintenanceStatusComponent } from './components/maintenance-status/maintenance-status.component';

const MAINMENU_ROUTES: Routes = [
    { path: 'shipReadiness', component: ShipReadinessComponent },
    { path: 'maintenanceStatus', component: MaintenanceStatusComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(MAINMENU_ROUTES, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}