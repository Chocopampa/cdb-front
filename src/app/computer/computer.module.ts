import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './routed/computer-list/computer-list.component';
import { ComputerDetailComponent } from './routed/computer-detail/computer-detail.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ComputerOverviewComponent } from './routed/computer-overview/computer-overview.component';
import { ComputerUpdateComponent } from './routed/computer-update/computer-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ComputerListComponent,
    ComputerDetailComponent,
    ComputerOverviewComponent,
    ComputerUpdateComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ComputerListComponent, FormsModule, ReactiveFormsModule]
})
export class ComputerModule {}
