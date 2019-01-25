import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './routed/user-registration/user-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { UserLoginComponent } from './routed/user-login/user-login.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [UserRegistrationComponent, UserLoginComponent],
  imports: [CommonModule, FormsModule, CustomMaterialModule, ReactiveFormsModule, AppRoutingModule]
})
export class UserModule {}
