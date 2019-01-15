import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './routed/company-list/company-list.component';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [CommonModule],
  exports: [CompanyListComponent]
})
export class CompanyModule {}
