import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { CommodityService, Commodity } from 'src/app/menu/service/commodity.service';

@Component({
  selector: 'hibaku-supply-demand-form',
  templateUrl: './supply-demand-form.component.html',
  styleUrls: ['../supply-demand.component.scss', './supply-demand-form.component.scss'],
})
export class SupplyDemandFormComponent extends BaseFormComponent implements OnInit {

  form: FormGroup;
  commodities: Array<Commodity>;
  quantityUnit: string;
  afterSubmit: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<Commodity>, private commodityService: CommodityService, public dialogRef: MatDialogRef<SupplyDemandFormComponent>, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.commodities = this.data;
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      commodityId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.setSpinner(true);
    const subscription: Subscription = this.commodityService
      .addSupply(this.form.value)
      .subscribe(() => {
        const message = `${this.form.get('type').value === 'DEMAND' ? 'Permintaan' : 'Pasokan'} telah diterima.`;
        this.okResponse(subscription, message);
        this.resetForm();
        this.dialogRef.close();
        this.afterSubmit.emit();
      }, err => this.onErrorResponse(subscription, err));
  }

  resetForm() {
    this.form.removeControl('price');
    this.form.reset();
  }

  onSelectType(value: string) {
    if (value === 'SUPPLY') {
      this.form.addControl('price', new FormControl(null, Validators.required));
    } else if (value === 'DEMAND' && this.form.get('price')) {
      this.form.removeControl('price');
    }
  }

  onSelectCommodity() {
    const id = this.form.get('commodityId').value;
    this.commodities.forEach(commodity => {
      if (id === commodity.id) {
        this.quantityUnit = commodity.unit;
      }
    });
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }
}
