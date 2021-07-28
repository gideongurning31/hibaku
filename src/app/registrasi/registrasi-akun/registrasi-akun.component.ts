import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { RegistrasiService } from '../registrasi.service';
import { LoginPayload } from 'src/app/utils/service/auth.service';

@Component({
  selector: 'hibaku-registrasi-akun',
  templateUrl: './registrasi-akun.component.html',
  styleUrls: ['../../login/login.component.scss', './registrasi-akun.component.scss'],
  providers: [RegistrasiService],
})
export class RegistrasiAkunComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;
  successRegister: EventEmitter<LoginPayload> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<RegistrasiAkunComponent>, private registerService: RegistrasiService, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      nik: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      userId: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      passConfirm: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.setSpinner(true);
    const account = this.form.value.userId;
    const subscription: Subscription = this.registerService
      .registerAccount(this.form.value)
      .subscribe(() => {
        this.okResponse(subscription, `Registrasi berhasil, akun HIBAKU Anda terdaftar dengan User ID: "${account}"`);
        this.successRegister.emit({ username: this.form.value.userId, password: this.form.value.pass });
        this.close();
      }, (err) => this.onErrorResponse(subscription, err));
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }
}
