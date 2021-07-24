import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './utils/component/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((load) => load.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then((load) => load.MenuModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
