import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BasePagingComponent } from 'src/app/utils/component/base-paging.component';
import { RegistrasiUserComponent } from 'src/app/registrasi/registrasi-user/registrasi-user.component';
import { VerifyConfirmComponent } from './verify-confirm/verify-confirm.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { RegistrasiService } from 'src/app/registrasi/registrasi.service';
import { User } from 'src/app/registrasi/User.model';
import { Paging } from 'src/app/utils/component/pagination/pagination.component';

@Component({
  selector: 'hibaku-user-management',
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
  providers: [RegistrasiService],
})
export class UserManagementComponent extends BasePagingComponent implements OnInit {
  tableHeaders: Array<string> = [];
  dataTable: Array<User> = [];

  constructor(private regService: RegistrasiService, private matDialog: MatDialog, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDataTable();
  }

  initDataTable(emitter?: Subscription) {
    if (emitter) emitter.unsubscribe();
    this.setSpinner(true);
    this.tableHeaders = ['#', 'NIK', 'Nama', 'Tanggal Lahir', 'Tempat Lahir', 'Alamat', ''];
    const subscription: Subscription = this.regService
      .fetchDataTable(this.paging.page, this.paging.limit)
      .subscribe(resp => {
        this.dataTable = resp.data;
        this.setPage(resp.paging);
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  registerUser() {
    const dialogRef = this.matDialog.open(RegistrasiUserComponent);
    const subscription: Subscription = dialogRef.componentInstance.successSubmit.subscribe(() => this.initDataTable(subscription));
  }

  verifyUser(data: User) {
    const dialogRef = this.matDialog.open(VerifyConfirmComponent, { data });
    const subscription: Subscription = dialogRef.componentInstance.verifyConfirm.subscribe((approval: boolean) => this.submitVerification(data.userId, approval, subscription));
  }

  private submitVerification(userId: string, approval: boolean, dialogSubs: Subscription) {
    dialogSubs.unsubscribe();
    const subscription: Subscription = this.regService
      .verifyAccount(userId, approval)
      .subscribe(() => {
        const status = approval ? 'diaktifkan' : 'dinon-aktifkan';
        this.okResponse(subscription, `Akun user "${userId}" telah ${status}.`);
        this.initDataTable();
      }, err => this.onErrorResponse(subscription, err));
  }

  onPagingEvent(paging: Paging) {
    this.paging = paging;
    this.initDataTable();
  }
}
