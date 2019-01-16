import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './routed/company-list/company-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [CommonModule, CustomMaterialModule],
  exports: [CompanyListComponent]
})
export class CompanyModule {}
