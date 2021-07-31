import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { PaginationComponent } from './component/pagination/pagination.component';
import { FullAddressPipe } from './pipe/full-address.pipe';
import { NoWhitespacePipe } from './pipe/no-whitespace.pipe';
import { OnlyNumericPipe } from './pipe/only-numeric.pipe';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, MatDialogModule, MatProgressSpinnerModule],
  declarations: [BaseFormComponent, NotFoundComponent, AlertDialogComponent, SpinnerCloakComponent, PaginationComponent, FullAddressPipe, NoWhitespacePipe, OnlyNumericPipe],
  entryComponents: [],
  providers: [RouteGuard, LoginGuard, HttpUtilService, AuthService, SpinnerCloakService],
  exports: [BaseFormComponent, SpinnerCloakComponent, PaginationComponent, FullAddressPipe, NoWhitespacePipe, OnlyNumericPipe],
})
export class UtilsModule {}
