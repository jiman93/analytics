import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JrListComponent } from './components/jobrequest/jr-list/jr-list.component';
import { JrCreateComponent } from './components/jobrequest/jr-create/jr-create.component';



const MAINMENU_ROUTES: Routes = [
  { path: 'job_request/list', component: JrListComponent },
  { path: 'job_request/create', component: JrCreateComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(MAINMENU_ROUTES, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}