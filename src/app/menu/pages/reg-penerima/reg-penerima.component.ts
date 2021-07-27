import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { RegistrasiUserComponent } from 'src/app/registrasi/registrasi-user/registrasi-user.component';
import { RegistrasiService } from 'src/app/registrasi/registrasi.service';
import { RegistrasiUser } from 'src/app/registrasi/Registrasi.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hibahku-reg-penerima',
  templateUrl: './reg-penerima.component.html',
  styleUrls: ['./reg-penerima.component.scss'],
  providers: [RegistrasiService],
})
export class RegPenerimaComponent extends BaseFormComponent implements OnInit {
  tableHeaders: Array<string> = [];
  dataTable: Array<RegistrasiUser> = [];

  constructor(private regService: RegistrasiService, private matDialog: MatDialog, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit() {
    this.initDataTable();
  }

  initDataTable() {
    this.setSpinner(true);
    this.tableHeaders = ['#', 'NIK', 'Nama', 'Tanggal Lahir', 'Tempat Lahir', 'Alamat', 'Tindakan'];
    const subscription: Subscription = this.regService.fetchDataTable()
      .subscribe(resp => {
        this.dataTable = resp;
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  verifyUser(data: RegistrasiUser) {
    console.log(data);
  }

  registerUser() {
    const dialogRef = this.matDialog.open(RegistrasiUserComponent);
    dialogRef.componentInstance.successSubmit.subscribe(() => this.initDataTable());
  }
}
