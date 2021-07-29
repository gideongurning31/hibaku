import { KeyValue } from '@angular/common';
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
  type: Array<KeyValue<string, string>>;

  constructor(private commodityService: CommodityService, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.fetchCommodities();
    this.type = [
      { key: 'Pasokan', value: 'SUPPLY' },
      { key: 'Permintaan', value: 'DEMAND' },
    ];

    this.form = new FormGroup({
      commodityId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  fetchCommodities() {
    this.commodities = [];
    const subscription: Subscription = this.commodityService.fetchDataTable()
      .subscribe(data => {
        this.commodities = data;
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  submit() {
    const subscription: Subscription = this.commodityService
      .addSupply(this.form.value)
      .subscribe(() => {
        const message = `${this.form.get('type').value === 'DEMAND' ? 'Permintaan' : 'Pasokan'} telah diterima.`;
        this.okResponse(subscription, message);
      }, err => this.onErrorResponse(subscription, err));
  }
}
