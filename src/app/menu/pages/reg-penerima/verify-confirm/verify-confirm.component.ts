import { Component, OnInit, Optional, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrasiUser } from 'src/app/registrasi/Registrasi.model';

@Component({
  selector: 'app-verify-confirm',
  templateUrl: './verify-confirm.component.html',
  styleUrls: ['./verify-confirm.component.scss'],
})
export class VerifyConfirmComponent implements OnInit {
  user: RegistrasiUser;
  verifyConfirm: EventEmitter<void> = new EventEmitter();

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: RegistrasiUser, public dialogRef: MatDialogRef<VerifyConfirmComponent>) {}

  ngOnInit(): void {
    this.user = this.data;
  }

  confirm() {
    this.verifyConfirm.emit();
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
