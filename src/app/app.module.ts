import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { UtilsModule } from './utils/utils.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AppRoutingModule, UtilsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
