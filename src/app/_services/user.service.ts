import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';



const userRest = 'http://localhost:8080/api/employees/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUserById(id): Observable<any> {
    return this.http.get(userRest + id);
  }

  updateUser(data): Observable<any> {

    console.log(userRest + data.id);
    return this.http.put(userRest + data.id,data);
  }

  getAllUser(data): Observable<any> {
    return this.http.post(userRest,data);
  }
}