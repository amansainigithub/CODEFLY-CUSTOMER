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
export class AddressServiceService {

  constructor(private http:HttpClient) { }

    saveAddress(address:any): Observable<any> {
          return this.http.post(API_URL + "addressController/" + 'saveAddress', address, httpOptions);
        }

   getAddressList(): Observable<any> {
        return this.http.get(API_URL + "addressController/" + 'getAddress', httpOptions);
   }

   deleteAddress(id:any): Observable<any> {
    return this.http.get(API_URL + "addressController/" + 'deleteAddress/'+id , httpOptions);
    }

    setDefaultAddress(id:any): Observable<any> {
      return this.http.get(API_URL + "addressController/" + 'setDefaultAddress/'+id , httpOptions);
      }

      getAddressById(id:any): Observable<any> {
        return this.http.get(API_URL + "addressController/" + 'getAddressById/'+id, httpOptions);
   }

   updateAddress(updateAddress:any): Observable<any> {
    return this.http.post(API_URL + "addressController/" + 'updateAddress', updateAddress, httpOptions);
  }
}
