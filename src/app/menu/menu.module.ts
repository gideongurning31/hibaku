import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MenuRoutingModule } from './menu-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home.component';
import { RegPenerimaComponent } from './pages/reg-penerima.component';
import { RegProdusenComponent } from './pages/reg-produsen.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, RegPenerimaComponent, RegProdusenComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MenuRoutingModule],
  providers: [],
})
export class MenuModule {}
