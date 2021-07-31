import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/registrasi/User.model';

@Component({
  selector: 'app-verify-confirm',
  templateUrl: './verify-confirm.component.html',
  styleUrls: ['./verify-confirm.component.scss'],
})
export class VerifyConfirmComponent implements OnInit {
  user: User;
  verifyConfirm: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, public dialogRef: MatDialogRef<VerifyConfirmComponent>) {}

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
