import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginGuard, RouteGuard } from './service/route-guard.service';
import { HttpUtilService } from './service/http-util.service';
import { AuthService } from './service/auth.service';
import { NotFoundComponent } from './component/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  entryComponents: [],
  imports: [CommonModule, HttpClientModule, MatDialogModule],
  providers: [RouteGuard, LoginGuard, HttpUtilService, AuthService],
  exports: [],
})
export class UtilsModule {}
