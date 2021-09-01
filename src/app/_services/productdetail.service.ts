import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';





const baseURL = 'http://localhost:8080/api/productdetail/';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private httpClient: HttpClient) { }
  createProductDetail(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }}
      );
  }


  getProductDetail(): Observable<any> {
    return this.httpClient.get(baseURL);
  }


  updateProductDetail(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'update', data,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }}
      );
  }

  deleteDetail(id: any) :Observable<any> {
    return this.httpClient.post(baseURL + 'delete', id);
  }
}