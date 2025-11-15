import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080/customer/api/v1';


@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient , private toast:NgToastService) { }



   getHomePage(): Observable<any> {
     return this.http.get(API_URL + "/homePageController/" + 'fetchHomePage', httpOptions);
   }
}
