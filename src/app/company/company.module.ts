import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './routed/company-list/company-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CompanyDetailComponent } from './routed/company-detail/company-detail.component';
import { RouterModule } from '@angular/router';
import { CompanyOverviewComponent } from './routed/company-overview/company-overview.component';
import { CompanyCreateComponent } from './routed/company-create/company-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyUpdateComponent } from './routed/company-update/company-update.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyDetailComponent, CompanyOverviewComponent, CompanyCreateComponent, CompanyUpdateComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [CompanyListComponent, CompanyDetailComponent,
    FormsModule,
    ReactiveFormsModule]
})
export class CompanyModule {}
