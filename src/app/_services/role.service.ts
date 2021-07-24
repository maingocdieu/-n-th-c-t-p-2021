import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseURL = 'http://localhost:8080/api/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  readAll(): Observable<any> {
    return this.httpClient.get(baseURL);
  }
}
