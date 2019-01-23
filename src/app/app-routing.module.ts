import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/routed/company-list/company-list.component';
import { CompanyCreateComponent } from './company/routed/company-create/company-create.component';
import { CompanyUpdateComponent } from './company/routed/company-update/company-update.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { ComputerListComponent } from './computer/routed/computer-list/computer-list.component';
import { ComputerUpdateComponent } from './computer/routed/computer-update/computer-update.component';
import { ComputerOverviewComponent } from './computer/routed/computer-overview/computer-overview.component';
import { ComputerCreateComponent } from './computer/routed/computer-create/computer-create.component';
import { UserRegistrationComponent } from './user/routed/user-registration/user-registration.component';
import { UserLoginComponent } from './user/routed/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContentComponent
  },
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
    path: 'computers',
    component: ComputerListComponent
  },
  {
    path: 'computers/update/:id',
    component: ComputerUpdateComponent
  },
  {
    path: 'computers/create',
    component: ComputerCreateComponent
  },
  {
    path: 'computers/:id',
    component: ComputerOverviewComponent
  },
  {
    path: 'registration',
    component: UserRegistrationComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
