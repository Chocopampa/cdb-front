import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule } from './company/company.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComputerModule } from './computer/computer.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompanyModule,
    UserModule,
    ComputerModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: getCurentLocale() }],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getCurentLocale(): string {
  return localStorage.getItem('Language') || 'en';
}
