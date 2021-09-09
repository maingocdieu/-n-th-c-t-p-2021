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

  

  getUserById(id): Observable<any> {
    return this.http.get(userRest + id);
  }

  updateUser(data): Observable<any> {
       return this.http.put(userRest + data.id,data);
  }

  updateUserAdmin(id, data):Observable<any> {
    return this.http.post(userRest + id,data);
  }

  getAllUser(data): Observable<any> {
    return this.http.post(userRest,data);
  }

  deleteuser(id) : Observable<any> {
    return this.http.delete(userRest +id);
  }
}