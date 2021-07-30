import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { CommodityService, SupplyDemand } from '../../service/commodity-service';
import { SupplyDemandFormComponent } from './supply-demand-form/supply-demand-form.component';

@Component({
  selector: 'hibaku-supply-demand',
  templateUrl: './supply-demand.component.html',
  styleUrls: ['./supply-demand.component.scss'],
})
export class SupplyDemandComponent extends BaseFormComponent implements OnInit {
  tableHeaders: Array<string> = [];
  dataTable: Array<SupplyDemand> = [];

  constructor(private commodityService: CommodityService, private matDialog: MatDialog, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit() {
    this.initDataTable();
  }

  initDataTable(emitter?: Subscription) {
    if (emitter) emitter.unsubscribe();
    this.setSpinner(true);
    this.tableHeaders = ['#', 'Komoditas', 'Jumlah', 'Jenis', 'Harga (Total)', 'ID User', 'Atas Nama', 'Tanggal Masuk'];
    const subscription: Subscription = this.commodityService.fetchSupplyDemand()
      .subscribe(data => {
        this.dataTable = data;
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  openForm() {
    const dialogRef = this.matDialog.open(SupplyDemandFormComponent);
    const subscription: Subscription = dialogRef.componentInstance.afterSubmit.subscribe(() => this.initDataTable(subscription));
  }
}
