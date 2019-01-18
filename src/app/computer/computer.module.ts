import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './routed/computer-list/computer-list.component';
import { ComputerDetailComponent } from './routed/computer-detail/computer-detail.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ComputerOverviewComponent } from './routed/computer-overview/computer-overview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComputerListComponent, ComputerDetailComponent, ComputerOverviewComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule],
  exports: [ComputerListComponent]
})
export class ComputerModule {}
