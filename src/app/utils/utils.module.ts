import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginGuard, RouteGuard } from './service/route-guard.service';
import { HttpUtilService } from './service/http-util.service';
import { AuthService } from './service/auth.service';
import { SpinnerCloakService } from './component/spinner-cloak/spinner-cloak.service';
import { BaseFormComponent } from './component/base-form.component';
import { NotFoundComponent } from './component/not-found.component';
import { AlertDialogComponent } from './component/alert-dialog.component';
import { SpinnerCloakComponent } from './component/spinner-cloak/spinner-cloak.component';

@NgModule({
  declarations: [BaseFormComponent, NotFoundComponent, AlertDialogComponent, SpinnerCloakComponent],
  entryComponents: [],
  imports: [CommonModule, HttpClientModule, MatDialogModule, MatProgressSpinnerModule],
  providers: [RouteGuard, LoginGuard, HttpUtilService, AuthService, SpinnerCloakService],
  exports: [BaseFormComponent, SpinnerCloakComponent],
})
export class UtilsModule {}
