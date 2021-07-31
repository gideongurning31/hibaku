import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerCloakService } from './spinner-cloak/spinner-cloak.service';
import { BaseFormComponent } from './base-form.component';
import { PaginationComponent, Paging } from './pagination/pagination.component';

@Component({
  selector: 'app-base-paging',
  template: '',
})
export class BasePagingComponent extends BaseFormComponent implements OnInit {

  @ViewChild(PaginationComponent) pagination: PaginationComponent;
  paging: Paging;

  constructor(dialog: MatDialog, spinner: SpinnerCloakService) {
    super(dialog, spinner);
  }

  ngOnInit() {
    this.paging = { page: 1, limit: 10 };
  }

  setPage(paging: Paging) {
    this.paging = paging;
    this.pagination.paging = this.paging;
    this.pagination.generateButtons();
  }

}
