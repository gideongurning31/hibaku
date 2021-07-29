import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { Commodity, CommodityService } from '../../service/commodity-service';

@Component({
  selector: 'hibaku-supply-demand',
  templateUrl: './supply-demand.component.html',
  styleUrls: ['./supply-demand.component.scss'],
})
export class SupplyDemandComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;
  commodities: Array<Commodity>;
  quantityUnit: string;

  constructor(private commodityService: CommodityService, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.fetchCommodities();
    this.form = new FormGroup({
      commodityId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  fetchCommodities() {
    this.setSpinner(true);
    this.commodities = [];
    const subscription: Subscription = this.commodityService.fetchDataTable()
      .subscribe(data => {
        this.commodities = data;
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  submit() {
    this.setSpinner(true);
    const subscription: Subscription = this.commodityService
      .addSupply(this.form.value)
      .subscribe(() => {
        const message = `${this.form.get('type').value === 'DEMAND' ? 'Permintaan' : 'Pasokan'} telah diterima.`;
        this.okResponse(subscription, message);
        this.resetForm();
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
    this.commodities.forEach((commodity) => {
      if (id === commodity.id) {
        this.quantityUnit = commodity.unit;
      }
    });
  }
}
