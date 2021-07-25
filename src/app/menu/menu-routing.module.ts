import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '../utils/service/route-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home.component';
import { RegProdusenComponent } from './pages/reg-produsen.component';
import { RegPenerimaComponent } from './pages/reg-penerima.component';

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
        path: 'registrasi-produsen',
        component: RegProdusenComponent,
        canActivate: [RouteGuard],
      },
      {
        path: 'registrasi-penerima',
        component: RegPenerimaComponent,
        canActivate: [RouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}