import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { UtilsModule } from './utils/utils.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrasiComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, AppRoutingModule, UtilsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
