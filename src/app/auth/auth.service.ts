import { Injectable } from '@angular/core';
import { HttpUtilService } from '../utils/http-util.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpUtilService) {}

  login(username: string, password: string) {
    const api = 'http://localhost:3000/api/login';
    return this.http.post(api, { username, password });
  }

}
