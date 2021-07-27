import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { RegistrasiService } from '../registrasi.service';
import { RegistrasiAkun } from '../Registrasi.model';

@Component({
  selector: 'hibahku-registrasi-akun',
  templateUrl: './registrasi-akun.component.html',
  styleUrls: ['../../login/login.component.scss', './registrasi-akun.component.scss'],
  providers: [RegistrasiService],
})
export class RegistrasiAkunComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<RegistrasiAkunComponent>, private registerService: RegistrasiService, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      nik: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
      passConfirm: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.setSpinner(true);
    const account = this.form.value.userId;
    const subscription: Subscription = this.registerService
      .registerAccount(this.form.value)
      .subscribe((resp: RegistrasiAkun) => {
        console.log(resp);
        this.close();
        this.okResponse(subscription, `Registrasi user berhasil, silakan login ke akun HIBAHKU Anda dengan User ID: ${account}`);
      }, err => this.onErrorResponse(subscription, err));
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }
}
