import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AlertDialogComponent } from './alert-dialog.component';
import { SpinnerCloakService } from './spinner-cloak/spinner-cloak.service';

@Component({
  selector: 'app-base-form',
  template: '',
})
export class BaseFormComponent {
  constructor(private dialog: MatDialog, private spinner: SpinnerCloakService) {}

  successSubmit: EventEmitter<void> = new EventEmitter();
  failedSubmit: EventEmitter<string> = new EventEmitter();

  okResponse(subscription: Subscription, message?: string) {
    subscription.unsubscribe();
    this.spinner.setSpinner(false);
    this.successSubmit.emit();
    if (message) this.alertDialog(message);
  }

  onErrorResponse(subscription: Subscription, e: any) {
    subscription.unsubscribe();
    this.spinner.setSpinner(false);
    if (e instanceof HttpErrorResponse) {
      this.alertDialog('Terjadi kesalahan pada internal sistem.');
    } else {
      this.alertDialog(e);
    }
  }

  alertDialog(message: string) {
    this.dialog.open(AlertDialogComponent, { data: message });
  }

  setSpinner(display: boolean) {
    this.spinner.setSpinner(display);
  }
}
