import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const baseURL = 'http://localhost:8080/api/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private httpClient: HttpClient) {}

  readAllProduct(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  insertProduct(data: any): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  updateProduct(index: number, data: any): Observable<any> {
    return this.httpClient.put(baseURL + '/' + index, data);
  }

  deleteById(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/delete', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getById(id):Observable<any> {
    return this.httpClient.get(baseURL+ '/' + id);
  }

  getProductPagingList(data: any) : Observable<any>{
    return this.httpClient.post( baseURL+"/getPageProduct",data);
  }
  getProductByCategory(id) : Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/product/getPageProductCategory/"+id);
  }

  

 
}
