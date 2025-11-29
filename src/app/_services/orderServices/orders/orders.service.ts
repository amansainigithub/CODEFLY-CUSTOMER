import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CUSTOMER_AUTH_API_URL } from '../../../URL/ApiUrls';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor(private http: HttpClient) {}

  fetchOrderItems(request:any , username:any): Observable<any> {
    return this.http.post(CUSTOMER_AUTH_API_URL + "customerOrderController/"
    +'fetchCustomerOrders?page='+request.page + '&size=' +request.size + '&username='+username, httpOptions);
}



}
