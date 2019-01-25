import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './routed/computer-list/computer-list.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ComputerUpdateComponent } from './routed/computer-update/computer-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComputerCreateComponent } from './routed/computer-create/computer-create.component';

@NgModule({
  declarations: [
    ComputerListComponent,
    ComputerUpdateComponent,
    ComputerCreateComponent
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
