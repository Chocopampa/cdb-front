import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [MatCardModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class CustomMaterialModule {}
