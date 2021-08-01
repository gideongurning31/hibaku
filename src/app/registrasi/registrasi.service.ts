import { Injectable } from '@angular/core';
import { HttpUtilService } from '../utils/service/http-util.service';
import { RegistrasiAkun, User } from './User.model';

@Injectable()
export class RegistrasiService {
  constructor(private http: HttpUtilService) {}

  registerUser(user: User) {
    return this.http.post('/user', user);
  }

  registerAccount(user: RegistrasiAkun) {
    return this.http.post('/account', user);
  }

  verifyAccount(userId: string, approval: boolean = true) {
    return this.http.post('/account/verify', { userId, approval });
  }

  fetchDataTable(page: number = 1, limit: number = 10) {
    return this.http.get('/user'.concat(`?page=${page}&limit=${limit}`));
  }
}
