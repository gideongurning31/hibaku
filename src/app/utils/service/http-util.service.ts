import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpUtilService {
  serviceUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(this.serviceUrl.concat(endpoint)).pipe(map((resp) => this.extractResponse(resp)));
  }

  post(endpoint: string, payload?: any) {
    return this.http.post(this.serviceUrl.concat(endpoint), payload).pipe(map((resp) => this.extractResponse(resp)));
  }

  download(endpoint: string): Observable<Blob> {
    return this.http.get(this.serviceUrl.concat(endpoint), { responseType: 'blob' }).pipe(map((resp) => this.extractResponse(resp)));
  }

  upload(endpoint: string, params?: FormData) {
    return this.http.post(this.serviceUrl.concat(endpoint), params).pipe(map((resp) => this.extractResponse(resp)));
  }

  private extractResponse(resp) {
    if (resp.exception) throw new Error(resp.message ? resp.message : 'Something went wrong.');
    return resp;
  }
}
