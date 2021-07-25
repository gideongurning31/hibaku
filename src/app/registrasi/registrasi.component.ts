import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'hibahku-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['../login/login.component.scss', './registrasi.component.scss'],
})
export class RegistrasiComponent {
  constructor(public dialogRef: MatDialogRef<RegistrasiComponent>) {}
}
