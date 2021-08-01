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
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionInputComponent } from './pages/transaction/transaction-input/transaction-input.component';
import { KomoditasComponent } from './pages/komoditas/komoditas.component';
import { KomoditasFormComponent } from './pages/komoditas/komoditas-form/komoditas-form.component';
import { SupplyDemandComponent } from './pages/supply-demand/supply-demand.component';
import { SupplyDemandFormComponent } from './pages/supply-demand/supply-demand-form/supply-demand-form.component';
import { UserManagementComponent } from './pages/user-management/user-management';
import { VerifyConfirmComponent } from './pages/user-management/verify-confirm/verify-confirm.component';
import { CommodityService } from './service/commodity-service';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    TransactionComponent,
    TransactionInputComponent,
    KomoditasComponent,
    KomoditasFormComponent,
    SupplyDemandComponent,
    SupplyDemandFormComponent,
    UserManagementComponent,
    VerifyConfirmComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatTooltipModule, MenuRoutingModule, UtilsModule],
  providers: [CommodityService],
})
export class MenuModule {}
