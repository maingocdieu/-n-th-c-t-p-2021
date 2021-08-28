import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';





const baseURL = 'http://localhost:8080/api/color/';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }


  readAllColor(): Observable<any> {
    return this.httpClient.get(baseURL);
  }
  createColor(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  updateColor(index: number, data: any): Observable<any> {
    return this.httpClient.put(baseURL  + index, data);
  }

  deleteById(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/delete', data).pipe(
      map((res) => {
        return res;
      })
    );
  }
  deleteColor(data):Observable<any> {
   let id = {
      "id": data
    }
    return this.httpClient.post(baseURL + 'deleteColor' ,data,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }}
    
    );
  }
 
}