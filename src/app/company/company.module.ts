import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './routed/company-list/company-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CompanyDetailComponent } from './routed/company-detail/company-detail.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyDetailComponent],
  imports: [CommonModule, CustomMaterialModule],
  exports: [CompanyListComponent, CompanyDetailComponent]
})
export class CompanyModule {}
