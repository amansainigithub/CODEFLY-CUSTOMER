import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PUBLIC_API_URL } from '../../../URL/ApiUrls';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient , private toast:NgToastService) { }



   getHomePage(): Observable<any> {
     return this.http.get(PUBLIC_API_URL + "homePageController/" + 'fetchHomePage', httpOptions);
   }
}
