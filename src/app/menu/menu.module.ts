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
import { KomoditasComponent } from './pages/komoditas/komoditas.component';
import { KomoditasFormComponent } from './pages/komoditas/komoditas-form/komoditas-form.component';
import { SupplyDemandComponent } from './pages/supply-demand/supply-demand.component';
import { SupplyDemandFormComponent } from './pages/supply-demand/supply-demand-form/supply-demand-form.component';
import { RegProdusenComponent } from './pages/reg-produsen.component';
import { RegPenerimaComponent } from './pages/reg-penerima/reg-penerima.component';
import { VerifyConfirmComponent } from './pages/reg-penerima/verify-confirm/verify-confirm.component';
import { CommodityService } from './service/commodity-service';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    TransaksiComponent,
    KomoditasComponent,
    KomoditasFormComponent,
    SupplyDemandComponent,
    SupplyDemandFormComponent,
    RegProdusenComponent,
    RegPenerimaComponent,
    VerifyConfirmComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatTooltipModule, MenuRoutingModule, UtilsModule],
  providers: [CommodityService],
})
export class MenuModule {}
