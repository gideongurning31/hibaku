import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpUtilService } from './service/http-util.service';
import { LoginGuard, RouteGuard } from './service/route-guard.service';
import { NotFoundComponent } from './component/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  entryComponents: [],
  imports: [CommonModule, HttpClientModule, MatDialogModule],
  providers: [HttpUtilService, RouteGuard, LoginGuard],
  exports: [],
})
export class UtilsModule {}
