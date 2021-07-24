import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';

const baseURL = 'http://localhost:8080/api/employees';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  userSearch(data : any) :Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/employees/username",data);
  }
  readAll(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  getById(id):Observable<any> {
    return this.httpClient.get(baseURL+ '/' + id);
  }
  create(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  updateUser(index: number, data: any): Observable<any> {
    return this.httpClient.put(baseURL + '/' + index, data);
  }

  deleteById(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/delete', data).pipe(
      map((res) => {

        return res;
      })
    );
  }


  login(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/login', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getUserList(data: any) : Observable<any>{
      return this.httpClient.post( baseURL+"/test",data);
    }

}
