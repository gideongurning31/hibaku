import { Injectable } from '@angular/core';
import { HttpUtilService } from '../utils/service/http-util.service';
import { RegistrasiUser } from './Registrasi.model';

@Injectable()
export class RegistrasiService {
  constructor(private http: HttpUtilService) {}

  registerUser(user: RegistrasiUser) {
    return this.http.post('http://localhost:3000/api/user', user);
  }
}
