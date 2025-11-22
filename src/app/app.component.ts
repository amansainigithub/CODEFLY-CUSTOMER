import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from './_services/cartServices/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showFiller = false;
  title = 'JET-ANGULAR-2';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  activeTab: string = '';
  homePageFlag: any;

  constructor(
    private tokenStorageService: TokenStorageService, 
    private toast:NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService,
  public cartService: CartService) { }

  ngOnInit(): void {

    //Validate Users
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
   //Validate Users


   //Routing URL checking and 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || this.router.url;
       

        if(currentUrl === '/customer/dashboard'
          || currentUrl === '/customer/shipping-address'
        ){
          this.setActiveTab(currentUrl);
        }

        if (
          currentUrl === '/customer/dashboard' ||
          currentUrl === '/customer/shipping-address'
        ) {
          this.homePageFlag = true;
        } else {
          this.homePageFlag = false;
        }
      }
    });
  }


setActiveTab(tab: string) {
    this.homePageFlag = true;
    this.activeTab = tab;
    localStorage.setItem('activeTab', tab);
}



//LOGOUT###
logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
