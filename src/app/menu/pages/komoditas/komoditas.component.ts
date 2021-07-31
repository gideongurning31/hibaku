import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BasePagingComponent } from 'src/app/utils/component/base-paging.component';
import { KomoditasFormComponent } from './komoditas-form/komoditas-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { CommodityService, Commodity } from '../../service/commodity-service';
import { ActionType } from 'src/app/utils/model/ActionType.enum';
import { Paging } from 'src/app/utils/component/pagination/pagination.component';

@Component({
  selector: 'hibaku-komoditas',
  templateUrl: './komoditas.component.html',
  styleUrls: ['./komoditas.component.scss'],
})
export class KomoditasComponent extends BasePagingComponent implements OnInit {
  tableHeaders: Array<string> = [];
  dataTable: Array<Commodity> = [];

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
    this.tableHeaders = ['#', 'Nama Komoditas', 'Kategori', 'Satuan', 'Harga/satuan', ''];
    const subscription: Subscription = this.commodityService
      .fetchDataTable(this.paging.page, this.paging.limit)
      .subscribe(resp => {
        this.dataTable = resp.data;
        this.setPage(resp.paging);
        this.okResponse(subscription);
      }, err => this.onErrorResponse(subscription, err));
  }

  openForm(type: string = 'CREATE', commodity?: Commodity) {
    const dialogRef = this.matDialog.open(KomoditasFormComponent, { data: { type: ActionType[type], commodity } });
    const subscription: Subscription = dialogRef.componentInstance.successSubmit.subscribe(() => this.initDataTable(subscription));
  }

  onPagingEvent(paging: Paging) {
    this.paging = paging;
    this.initDataTable();
  }
}
