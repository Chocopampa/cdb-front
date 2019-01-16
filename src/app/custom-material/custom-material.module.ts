import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule],
  exports: [MatCardModule, MatToolbarModule, MatButtonModule]
})
export class CustomMaterialModule {}
