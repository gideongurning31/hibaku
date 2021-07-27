import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { RegistrasiService } from '../registrasi.service';
import { RegistrasiUser } from '../Registrasi.model';
import * as moment from 'moment';

@Component({
  selector: 'hibaku-registrasi-user',
  templateUrl: './registrasi-user.component.html',
  styleUrls: ['../../login/login.component.scss', './registrasi-user.component.scss'],
  providers: [RegistrasiService],
})
export class RegistrasiUserComponent extends BaseFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<RegistrasiUserComponent>, private registerService: RegistrasiService, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      accountType: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null),
      birthPlace: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      address3: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.setSpinner(true);
    const form = this.registerForm.value;
    const subscription: Subscription = this.registerService
      .registerUser({
        nik: form.nik,
        firstName: form.firstName,
        lastName: form.lastName,
        birthPlace: form.birthPlace,
        birthDate: moment(form.birthDate, 'YYYY-MM-DD').format('YYYYMMDD'),
        city: form.city,
        address: form.address1.concat(` Desa/Kelurahan ${form.address2}`).concat(` Kecamatan ${form.address3}`),
        zipCode: form.zipCode,
        accountType: AccountType[form.accountType],
      }).subscribe((resp: RegistrasiUser) => {
        this.close();
        this.okResponse(subscription, `Registrasi user berhasil, silakan registrasi akun HIBAKU dengan NIK: ${resp.nik}`);
      }, (err) => this.onErrorResponse(subscription, err));
  }

  close() {
    this.registerForm.reset();
    this.dialogRef.close();
  }
}

enum AccountType {
  PRODUSEN = '2',
  PENERIMA = '3',
}
