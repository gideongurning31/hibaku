import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'hibahku-registrasi-akun',
  templateUrl: './registrasi-akun.component.html',
  styleUrls: ['../../login/login.component.scss', './registrasi-akun.component.scss'],
})
export class RegistrasiAkunComponent {
  constructor(public dialogRef: MatDialogRef<RegistrasiAkunComponent>) {}
}
