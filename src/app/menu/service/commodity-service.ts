import { Injectable } from '@angular/core';
import { HttpUtilService } from 'src/app/utils/service/http-util.service';

@Injectable()
export class CommodityService {
  constructor(private http: HttpUtilService) {}

  fetchDataTable() {
    return this.http.get('/commodity');
  }
}

export interface Commodity {
  id: string;
  name: string;
  type: string;
  unit: string;
  price: number;
}
