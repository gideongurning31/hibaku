import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  template: `
    <div class="alert-message"><p>{{ message }}</p></div>
    <div class="alert-button"><button type="button" class="btn btn-info" (click)="dialogRef.close()">TUTUP</button></div>
  `,
  styles: [`
    .alert-message {
      min-height: 20vh;
      min-width: 30vw;
    }
    .alert-message, .alert-button {
      max-width: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    button {
      min-width: 150px;
      padding: 5px 20px;
    }`],
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: Array<string>, public dialogRef: MatDialogRef<AlertDialogComponent>) {}
}
