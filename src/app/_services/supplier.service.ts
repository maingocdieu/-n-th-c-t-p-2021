import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';





const baseURL = 'http://localhost:8080/api/supplier/';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient: HttpClient) { }


  readAllSupplier(): Observable<any> {
    return this.httpClient.get(baseURL);
  }
  createSupplier(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  updateSupplier(index: number, data: any): Observable<any> {
    return this.httpClient.put(baseURL  + index, data);
  }

  deleteSupplier(data):Observable<any> {
   let id = {
      "id": data
    }
    return this.httpClient.post(baseURL + 'deleteSupplier' ,data,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }}
    );
  }
 
}