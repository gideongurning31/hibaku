import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../utils/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

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

  submit() {
    this.validateForm();
  }

  private validateForm() {
    const payload = this.loginForm.value;
    return this.authService.login(payload.user, payload.pass)
      .subscribe((result) => console.log('===', result));
  }
}
