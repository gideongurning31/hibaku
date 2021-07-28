import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { CommodityService, Commodity } from '../../service/commodity-service';

@Component({
  selector: 'hibaku-komoditas',
  templateUrl: './komoditas.component.html',
  styleUrls: ['./komoditas.component.scss'],
})
export class KomoditasComponent extends BaseFormComponent implements OnInit {
  tableHeaders: Array<string> = [];
  dataTable: Array<Commodity> = [];
  categories: Array<KeyValue<string, string>>;
  constructor(private commodityService: CommodityService, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit() {
    this.categories = [
      { key: 'A', value: 'A' },
      { key: 'B', value: 'B' },
      { key: 'C', value: 'C' },
    ];
    this.initDataTable();
  }

  initDataTable(emitter?: Subscription) {
    if (emitter) emitter.unsubscribe();
    this.setSpinner(true);
    this.tableHeaders = ['#', 'Nama Komoditas', 'Kategori', 'Satuan', 'Harga/satuan', ''];
    const subscription: Subscription = this.commodityService.fetchDataTable()
      .subscribe(resp => {
        this.dataTable = resp;
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  create() {}
}
