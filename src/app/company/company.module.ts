import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './routed/company-list/company-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { RouterModule } from '@angular/router';
import { CompanyCreateComponent } from './routed/company-create/company-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyUpdateComponent } from './routed/company-update/company-update.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyCreateComponent, CompanyUpdateComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [CompanyListComponent,
    FormsModule,
    ReactiveFormsModule]
})
export class CompanyModule {}
