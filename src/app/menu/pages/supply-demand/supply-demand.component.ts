import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BasePagingComponent } from 'src/app/utils/component/base-paging.component';
import { SupplyDemandFormComponent } from './supply-demand-form/supply-demand-form.component';
import { TransactionInputComponent } from '../transaction/transaction-input/transaction-input.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { CommodityService, Commodity, SupplyDemand } from '../../service/commodity.service';
import { Paging } from 'src/app/utils/component/pagination/pagination.component';

@Component({
  selector: 'hibaku-supply-demand',
  templateUrl: './supply-demand.component.html',
  styleUrls: ['./supply-demand.component.scss'],
})
export class SupplyDemandComponent extends BasePagingComponent implements OnInit {

  tableHeaders: Array<string> = [];
  dataTable: Array<SupplyDemand> = [];
  commodities: Array<Commodity>;

  constructor(private commodityService: CommodityService, private matDialog: MatDialog, dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDataTable();
  }

  initDataTable(emitter?: Subscription) {
    if (emitter) emitter.unsubscribe();
    this.setSpinner(true);
    this.tableHeaders = ['#', 'Komoditas', 'Jumlah', 'Jenis', 'Harga (Total)', 'Atas Nama', 'Tanggal Masuk', 'Proses'];
    const subscription: Subscription = this.commodityService
      .fetchSupplyDemand(this.paging.page, this.paging.limit)
      .subscribe(resp => {
        this.dataTable = resp.data;
        this.setPage(resp.paging);
        this.fetchCommodities(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  fetchCommodities(emitter?: Subscription) {
    emitter.unsubscribe();
    this.commodities = [];
    const subscription: Subscription = this.commodityService
      .getAllCommodities()
      .subscribe(data => {
        this.commodities = data;
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  processTransaction(id: string) {
    this.setSpinner(true);
    const subscription: Subscription = this.commodityService
      .getSupplyDemandById(id)
      .subscribe((transaction: SupplyDemand) => {
        this.okResponse(subscription);
        this.matDialog.open(TransactionInputComponent, { data: transaction });
      }, err => this.onErrorResponse(subscription, err));
  }

  openForm() {
    const dialogRef = this.matDialog.open(SupplyDemandFormComponent, { data: this.commodities });
    const subscription: Subscription = dialogRef.componentInstance.afterSubmit.subscribe(() => this.initDataTable(subscription));
  }

  onPagingEvent(paging: Paging) {
    this.paging = paging;
    this.initDataTable();
  }
}
