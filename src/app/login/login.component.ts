import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseFormComponent } from '../utils/component/base-form.component';
import { RegistrasiComponent } from '../registrasi/registrasi.component';
import { AuthService } from '../utils/service/auth.service';
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
      user: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
    });
  }

  submitLogin() {
    this.setSpinner(true);
    const payload = this.loginForm.value;
    return this.authService.login(payload.user, payload.pass)
      .subscribe((token: string) => {
        this.authService.storeSessionToken(token);
        this.router.navigate(['/']);
        this.setSpinner(false);
        this.snackBar.open('Login berhasil.', 'x', { duration: 2500, horizontalPosition: 'end', verticalPosition: 'bottom' });
      }, (err) => {
        console.error(err);
        this.setSpinner(false);
        this.alertDialog('Login gagal.');
      });
  }

  register() {
    this.matDialog.open(RegistrasiComponent);
  }
}
