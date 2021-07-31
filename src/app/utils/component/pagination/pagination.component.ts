import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hibaku-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss'],
})
export class PaginationComponent {
  @Output() setPage: EventEmitter<Paging> = new EventEmitter();
  @Input() paging: Paging;

  constructor() {}

  pages: Array<number> = [];

  generateButtons() {
    this.pages = [];
    for (let i = 0; i < this.paging.totalPage; i++) {
      this.pages.push(i + 1);
    }
  }

  onPageClick(page: number) {
    this.paging.page = page;
    this.setPage.emit(this.paging);
  }

  onSetRows() {
    this.paging.page = 1;
    this.setPage.emit(this.paging);
    this.generateButtons();
  }
}

export interface Paging {
  page: number;
  limit: number;
  startRow?: number;
  totalData?: number;
  totalPage?: number;
}
