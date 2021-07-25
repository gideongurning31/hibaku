import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './http-util.service';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { TokenPayload } from '../model/TokenPayload.model';

@Injectable()
export class AuthService {
  constructor(private router: Router, private http: HttpUtilService) {}

  login(username: string, password: string) {
    const api = 'http://localhost:3000/api/login';
    return this.http.post(api, { username, password });
  }

  storeSessionToken(token: string) {
    const payload: TokenPayload = jwt_decode(token);
    localStorage.clear();
    localStorage.setItem('sessionToken', token);
    if (payload.verified) {
      localStorage.setItem('userId', payload.userId);
      localStorage.setItem('displayName', payload.displayName);
      localStorage.setItem('expiredAt', moment(payload.exp * 1000).format());
      localStorage.setItem('roleId', payload.roles[0].roleId);
      localStorage.setItem('roleName', payload.roles[0].roleName);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
