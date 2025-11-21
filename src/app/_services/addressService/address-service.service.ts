import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CUSTOMER_AUTH_API_URL } from '../../URL/ApiUrls';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  constructor(private http:HttpClient) { }

    saveAddress(address:any): Observable<any> {
          return this.http.post(CUSTOMER_AUTH_API_URL + "addressController/" + 'saveAddress', address, httpOptions);
        }

   getAddressList(): Observable<any> {
        return this.http.get(CUSTOMER_AUTH_API_URL + "addressController/" + 'getAddress', httpOptions);
   }

   deleteAddress(id:any): Observable<any> {
    return this.http.get(CUSTOMER_AUTH_API_URL + "addressController/" + 'deleteAddress/'+id , httpOptions);
    }

    setDefaultAddress(id:any): Observable<any> {
      return this.http.get(CUSTOMER_AUTH_API_URL + "addressController/" + 'setDefaultAddress/'+id , httpOptions);
      }

      getAddressById(id:any): Observable<any> {
        return this.http.get(CUSTOMER_AUTH_API_URL + "addressController/" + 'getAddressById/'+id, httpOptions);
   }

   updateAddress(updateAddress:any): Observable<any> {
    return this.http.post(CUSTOMER_AUTH_API_URL + "addressController/" + 'updateAddress', updateAddress, httpOptions);
  }
}
