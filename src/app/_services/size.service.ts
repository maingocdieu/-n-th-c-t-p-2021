import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';





const baseURL = 'http://localhost:8080/api/size/';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private httpClient: HttpClient) { }


  readAllSize(): Observable<any> {
    return this.httpClient.get(baseURL);
  }
  createSize(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  updateSize(index: number, data: any): Observable<any> {
    return this.httpClient.put(baseURL  + index, data);
  }

  deleteById(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/delete', data).pipe(
      map((res) => {
        return res;
      })
    );
  }
  deleteSize(data):Observable<any> {
   let id = {
      "id": data
    }
    return this.httpClient.post(baseURL + 'deleteSize' ,data,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }}
    
    );
  }
 
}