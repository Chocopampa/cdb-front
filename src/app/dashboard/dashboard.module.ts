import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardContentComponent],
  imports: [
    CommonModule, CustomMaterialModule, RouterModule, CustomMaterialModule
  ], exports: [
    DashboardContentComponent
  ]
})
export class DashboardModule { }
