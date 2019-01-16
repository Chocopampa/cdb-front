import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/routed/company-list/company-list.component';

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyListComponent
  }, {
    path: '**',
    redirectTo: 'companies'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
