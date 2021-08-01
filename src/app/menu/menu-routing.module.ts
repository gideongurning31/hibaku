import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard, AdminGuard } from '../utils/service/route-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { KomoditasComponent } from './pages/komoditas/komoditas.component';
import { SupplyDemandComponent } from './pages/supply-demand/supply-demand.component';
import { UserManagementComponent } from './pages/user-management/user-management';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [RouteGuard],
      },
      {
        path: 'transaksi',
        component: TransactionComponent,
        canActivate: [RouteGuard, AdminGuard],
      },
      {
        path: 'komoditas',
        component: KomoditasComponent,
        canActivate: [RouteGuard, AdminGuard],
      },
      {
        path: 'supply-demand',
        component: SupplyDemandComponent,
        canActivate: [RouteGuard],
      },
      {
        path: 'registrasi-penerima',
        component: UserManagementComponent,
        canActivate: [RouteGuard, AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
