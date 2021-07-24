import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuRoutingModule } from './menu-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MenuRoutingModule],
  providers: [],
})
export class MenuModule {}
