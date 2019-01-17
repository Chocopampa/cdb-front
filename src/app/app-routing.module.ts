import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/routed/company-list/company-list.component';
import { CompanyOverviewComponent } from './company/routed/company-overview/company-overview.component';
import { CompanyCreateComponent } from './company/routed/company-create/company-create.component';
import { CompanyUpdateComponent } from './company/routed/company-update/company-update.component';

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyListComponent
  },
  {
    path: 'companies/create',
    component: CompanyCreateComponent
  },
  {
    path: 'companies/update/:id',
    component: CompanyUpdateComponent
  },
  {
    path: 'companies/:id',
    component: CompanyOverviewComponent
  },
  {
    path: '**',
    redirectTo: 'companies'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
