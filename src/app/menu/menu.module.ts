import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuRoutingModule } from './menu-routing.module';
import { UtilsModule } from '../utils/utils.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home.component';
import { TransaksiComponent } from './pages/transaksi.component';
import { KomoditasComponent } from './pages/komoditas.component';
import { RegProdusenComponent } from './pages/reg-produsen.component';
import { RegPenerimaComponent } from './pages/reg-penerima/reg-penerima.component';
import { VerifyConfirmComponent } from './pages/reg-penerima/verify-confirm/verify-confirm.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, TransaksiComponent, KomoditasComponent, RegProdusenComponent, RegPenerimaComponent, VerifyConfirmComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatTooltipModule, MenuRoutingModule, UtilsModule],
  providers: [],
})
export class MenuModule {}
