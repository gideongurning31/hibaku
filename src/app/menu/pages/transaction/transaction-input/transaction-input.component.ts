import { Component, OnInit, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { TransactionService } from 'src/app/menu/service/transaction.service';
import { SupplyDemand } from 'src/app/menu/service/commodity.service';

@Component({
  selector: 'hibaku-transaction-input',
  templateUrl: './transaction-input.component.html',
  styleUrls: ['./transaction-input.component.scss'],
})
export class TransactionInputComponent extends BaseFormComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  userKind: string;
  kind: string;
  trxFound: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SupplyDemand,
    private trxService: TransactionService,
    private dialogRef: MatDialogRef<TransactionInputComponent>,
    dialog: MatDialog,
    spinner: SpinnerCloakService
  ) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.userKind = this.data.type === 'SUPPLY' ? 'Pemasok' : 'Pemohon';
    this.kind = this.data.type === 'SUPPLY' ? 'Pasokan' : 'Permohonan';
    this.initForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initFormValue(), 100);
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  initForm(): void {
    this.form = new FormGroup({
      user: new FormControl(),
      item: new FormControl(),
      cost: new FormControl(),
      location: new FormControl(),
    });
  }

  initFormValue() {
    this.form.get('user').setValue(this.data.userDetails.firstName.concat(' ').concat(this.data.userDetails.lastName).trim());
    this.form.get('item').setValue(`${this.data.quantity} ${this.data.commodityDetails.unit} ${this.data.commodityDetails.name}`);
    this.form.get('cost').setValue(this.data.quantity * this.data.commodityDetails.price);
    this.form.get('location').setValue(this.data.userDetails.address.concat(', ').concat(this.data.userDetails.city).concat(' ').concat(this.data.userDetails.zipCode));
  }

  submit() {
    this.setSpinner(true);
    const subscription: Subscription = this.trxService
      .findTransactionCandidate(this.data.commodityId, this.data.type)
      .subscribe(result => {
        this.okResponse(subscription, result);
        this.trxFound = true;
      }, err => setTimeout(() => this.onErrorResponse(subscription, err), 1500));
  }

  processTransaction() {
    this.close();
    this.alertDialog('Transaksi diproses.');
  }

  close() {
    this.dialogRef.close();
  }
}
