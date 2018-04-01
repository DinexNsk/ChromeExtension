import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPageComponent } from './event-page/event-page.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: 'event-page', component: EventPageComponent },
  { path: 'popup', component: PopupComponent },
  { path: '', redirectTo: 'popup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
