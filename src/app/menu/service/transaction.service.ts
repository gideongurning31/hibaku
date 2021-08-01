import { Injectable } from '@angular/core';
import { HttpUtilService } from 'src/app/utils/service/http-util.service';

@Injectable()
export class TransactionService {
  constructor(private http: HttpUtilService) {}

  findTransactionCandidate(commodityId: string, type: string) {
    return this.http.get('/transaction/findCandidate/'.concat(`${commodityId}/${type}`));
  }

}
