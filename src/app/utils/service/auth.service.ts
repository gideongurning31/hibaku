import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './http-util.service';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { TokenPayload } from '../model/TokenPayload.model';

@Injectable()
export class AuthService {
  constructor(private router: Router, private http: HttpUtilService) {}

  login(payload: LoginPayload) {
    return this.http.post('/login', payload);
  }

  storeSessionToken(token: string) {
    const payload: TokenPayload = jwt_decode(token);
    localStorage.clear();
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('userId', payload.userId);
    localStorage.setItem('displayName', payload.displayName);
    if (payload.verified) {
      localStorage.setItem('roleId', payload.role.id);
      localStorage.setItem('roleName', payload.role.name);
      localStorage.setItem('expiredAt', moment(payload.exp * 1000).format('DDMMYY'));
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

export interface LoginPayload {
  username: string;
  password: string;
}
