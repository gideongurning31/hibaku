import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from '../utils/component/base-form.component';
import { RegistrasiUserComponent } from '../registrasi/registrasi-user/registrasi-user.component';
import { RegistrasiAkunComponent } from '../registrasi/registrasi-akun/registrasi-akun.component';
import { AuthService, LoginPayload } from '../utils/service/auth.service';
import { SpinnerCloakService } from '../utils/component/spinner-cloak/spinner-cloak.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar, private matDialog: MatDialog, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submitLogin(emitter?: Subscription) {
    if (emitter) emitter.unsubscribe();
    this.setSpinner(true);
    const subscription: Subscription = this.authService
      .login(this.loginForm.value)
      .subscribe((token: string) => {
        this.authService.storeSessionToken(token);
        this.router.navigate(['/']);
        this.okResponse(subscription);
        this.snackBar.open('Login berhasil.', 'x', { duration: 2500, horizontalPosition: 'end', verticalPosition: 'bottom' });
      }, err => this.onErrorResponse(subscription, err));
  }

  register(type: string) {
    this.loginForm.reset();
    if (RegType[type] === RegType.USER) {
      this.matDialog.open(RegistrasiUserComponent);
    } else if (RegType[type] === RegType.ACCOUNT) {
      const dialogRef = this.matDialog.open(RegistrasiAkunComponent);
      const subs: Subscription = dialogRef.componentInstance.successRegister
        .subscribe((credentials: LoginPayload) => {
          this.loginForm.controls.username.setValue(credentials.username);
          this.loginForm.controls.password.setValue(credentials.password);
          this.submitLogin(subs);
        });
    }
  }
}

enum RegType {
  USER = 'USER',
  ACCOUNT = 'ACCOUNT',
}
