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

  fetchDataTable() {
    return this.http.get('/user');
  }
}
