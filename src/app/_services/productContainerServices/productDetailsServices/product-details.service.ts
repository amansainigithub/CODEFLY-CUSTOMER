import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080/customer/api/v1';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

 constructor(private http: HttpClient) { }
 
 
 
    getProductDetails(productId:any, productName:any): Observable<any> {
      return this.http.get(API_URL + "/productDetailsCustomerController/" + 'getProductDetails/' 
        +productId + "/"+ productName , httpOptions);
    }
}
