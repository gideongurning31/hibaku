import { Injectable } from '@angular/core';
import { ActionType } from 'src/app/utils/model/ActionType.enum';
import { HttpUtilService } from 'src/app/utils/service/http-util.service';

@Injectable()
export class CommodityService {
  constructor(private http: HttpUtilService) {}

  fetchDataTable() {
    return this.http.get('/commodity');
  }

  submit(data: Commodity, type: ActionType = ActionType.CREATE) {
    let endpoint: string = '/commodity';
    if (type === ActionType.UPDATE) {
      endpoint = endpoint.concat('/update/').concat(data.id);
    } else if (type === ActionType.DELETE) {
      endpoint = endpoint.concat('/delete/').concat(data.id);
    }

    const payload = type === ActionType.DELETE ? {} : data;
    return this.http.post(endpoint, payload);
  }

  addSupply(payload: UsersCommodities) {
    payload.userId = localStorage.getItem('userId');
    return this.http.post('/users-commodities', payload);
  }
}

export interface Commodity {
  id?: string;
  name: string;
  type: string;
  unit: string;
  price: number;
}

export interface UsersCommodities {
  id?: string;
  userId: string;
  commodityId: string;
  quantity: number;
  type: string;
  price?: number;
}
