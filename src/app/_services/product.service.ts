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

  insertPhieuNhap(data: any): Observable<any> {
    return this.httpClient.post(baseURL +"/"+ "insertPhieuNhap", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
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

  getProductClientPage(data: any): Observable<any>{
    return this.httpClient.post( baseURL+"/getPageProductUser",data);
  }
  getProductPagingList(data: any) : Observable<any>{
    return this.httpClient.post( baseURL+"/getPageProduct",data);
  }
  getProductByCategory(id) : Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/product/getPageProductCategory/"+id);
  }

  readListProduct(): Observable<any> {
    return this.httpClient.get(baseURL + '/'+ 'getAll');
  }

  checkIdProduct(id) : Observable<any> {
    return this.httpClient.get(baseURL + '/check/' + id);
  }
 
 
  insertOder(data):Observable<any> {
    return this.httpClient.post(baseURL+ "/checkout" , data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }});

  }


  getListOder():Observable<any> {
    return this.httpClient.get(baseURL + "/getAllOder");
  }
 
  getListPhieuNhap():Observable<any> {
    return this.httpClient.get(baseURL + "/getPhieuNhap")
  }

  getDetailPhieuNhapById(id):Observable<any> {
    return this.httpClient.get(baseURL + "/getPhieuNhapById/"+ id)
  }

  updateChiTietPhieuNhap(data) : Observable<any> {
      return this.httpClient.post(baseURL+ "/updatechitietpn", data);
  }

  deletePn(id) : Observable<any> {
    return this.httpClient.post(baseURL+ "/deletepn", id);
  }

  deleteChiTietPhieuNhap(data): Observable<any> {
    return this.httpClient.post(baseURL+ "/deleteChiTietPn",data );
  }


  InsertChiTietPhieuNhap(data) : Observable<any> {
     return this.httpClient.post(baseURL+ "/insertChiTietPN",data );
  }

  updateStatus(data):Observable<any> {
    return this.httpClient.post(baseURL+ "/updateStatus", data);
  }

  deleteOrder(data): Observable<any> {
    return this.httpClient.post(baseURL+ "/deleteOrder", data);
  }

  searchProducts(data):Observable<any> {
    return this.httpClient.get(baseURL + '/search/' + data);
  }

  getPagePhieuNhap(page):Observable<any> {
    return this.httpClient.get(baseURL + '/getlistpn/' + page);
  }


  getPageOder(page):Observable<any> {
    return this.httpClient.get(baseURL + "/getlistOrder/" + page);
  }

  getOrderByUser(id):Observable<any> {
    return this.httpClient.post(baseURL + "/getOrderByUser", id );
  }

  cancelOder(id):Observable<any> {
    return this.httpClient.post(baseURL + "/cancelOrder", id );
  }

  updateStatusProduct(id): Observable <any> {
    return this.httpClient.post(baseURL + "/updateStatusProduct", id );
  }

getThongKe(data):Observable <any> {
  return this.httpClient.post(baseURL + "/thongke", data );
}


getThongKeLaiLo():Observable <any> {
  return this.httpClient.get(baseURL + "/thongkelailo" );
}

}
