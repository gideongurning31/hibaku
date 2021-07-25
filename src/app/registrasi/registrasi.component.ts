import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'hibahku-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['../login/login.component.scss', './registrasi.component.scss'],
})
export class RegistrasiComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<RegistrasiComponent>) {}

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
    console.info('===', this.registerForm.value);
  }

  close() {
    this.registerForm.reset();
    this.dialogRef.close();
  }
}

enum AccountType {
  TYPE1 = 'PRODUSEN',
  TYPE2 = 'PENERIMA',
}
