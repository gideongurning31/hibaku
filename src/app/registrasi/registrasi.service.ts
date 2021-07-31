import { Injectable } from '@angular/core';
import { HttpUtilService } from '../utils/service/http-util.service';
import { RegistrasiAkun, RegistrasiUser } from './Registrasi.model';

@Injectable()
export class RegistrasiService {
  constructor(private http: HttpUtilService) {}

  registerUser(user: RegistrasiUser) {
    return this.http.post('/user', user);
  }

  registerAccount(user: RegistrasiAkun) {
    return this.http.post('/account', user);
  }

  verifyAccount(userId: string) {
    return this.http.post('/account/verify', { userId, approval: true });
  }

  fetchDataTable(page: number = 1, limit: number = 10) {
    return this.http.get('/user'.concat(`?page=${page}&limit=${limit}`));
  }
}
