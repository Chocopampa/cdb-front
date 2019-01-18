import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './routed/computer-list/computer-list.component';
import { ComputerDetailComponent } from './routed/computer-detail/computer-detail.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ComputerOverviewComponent } from './routed/computer-overview/computer-overview.component';
import { RouterModule } from '@angular/router';
import { ComputerCreateComponent } from './routed/computer-create/computer-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ComputerListComponent, ComputerDetailComponent, ComputerOverviewComponent, ComputerCreateComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule, FormsModule],
  exports: [ComputerListComponent]
})
export class ComputerModule {}
