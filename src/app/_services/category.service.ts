import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseURL = 'http://localhost:8080/api/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  readAllCategory(): Observable<any> {
    return this.httpClient.get(baseURL);
  }
  createCategory(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  updateCategory(index: number, data: any): Observable<any> {
    return this.httpClient.put(baseURL + '/' + index, data);
  }

  deleteById(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/delete', data).pipe(
      map((res) => {
        return res;
      })
    );
  }


}
