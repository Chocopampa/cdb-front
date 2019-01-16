import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './routed/company-list/company-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CompanyDetailComponent } from './routed/company-detail/company-detail.component';
import { RouterModule } from '@angular/router';
import { CompanyOverviewComponent } from './routed/company-overview/company-overview.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyDetailComponent, CompanyOverviewComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule],
  exports: [CompanyListComponent, CompanyDetailComponent]
})
export class CompanyModule {}
