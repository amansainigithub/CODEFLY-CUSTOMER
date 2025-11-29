import { Component, HostListener, ViewChild } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from './_services/cartServices/cart.service';
import { ToastManagerService } from './_services/toastMangerService/toast-manager.service';
import { ToastManagerComponent } from './components/toastManager/toast-manager/toast-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('toastRef') toastRef!: ToastManagerComponent;
  
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
    private toast: NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public cartService: CartService,
    private toastManagerService: ToastManagerService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetSearch();
      }
    });
  }

  // TOAST MANAGER SERVICE REGISTER
  ngAfterViewInit() {
  this.toastManagerService.register(this.toastRef);
  } 
 // TOAST MANAGER SERVICE REGISTER



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

        if (
          currentUrl === '/customer/dashboard' ||
          currentUrl === '/customer/shipping-address' ||
          currentUrl === '/customer/orders'
        ) {
          this.setActiveTab(currentUrl);
        }

        if (
          currentUrl === '/customer/dashboard' ||
          currentUrl === '/customer/shipping-address' ||
          currentUrl === '/customer/orders'
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

  // ###################################################################################
  // ****************SEARCH DATA SATRTING**********************
  searchText: string = '';
  showSuggestions = false;
  activeIndex: number = -1;

  products = [
    { id: 1, title: 'iPhone 14', brand: 'Apple' },
    { id: 2, title: 'iPhone 13', brand: 'Apple' },
    { id: 3, title: 'Samsung Galaxy S23', brand: 'Samsung' },
    { id: 4, title: 'MacBook Air', brand: 'Apple' },
    { id: 5, title: 'MacBook Pro', brand: 'Apple' },
    { id: 6, title: 'OnePlus 12', brand: 'OnePlus' },
    { id: 7, title: 'Realme 12', brand: 'Realme' },
    { id: 8, title: 'Sony WH-1000XM5', brand: 'Sony' },
    { id: 9, title: 'Dell XPS 13', brand: 'Dell' },
    { id: 10, title: 'Nike Air Max', brand: 'Nike' },
  ];

  suggestions: any[] = [];

  onSearch() {
    if (this.searchText.trim().length >= 0) {
      const query = this.searchText.toLowerCase();

      this.suggestions = this.products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );

      this.showSuggestions = this.suggestions.length > 0;
      this.activeIndex = -1;
    } else {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(item: any) {
    this.searchText = item.title;
    this.showSuggestions = false;
    this.activeIndex = -1;

    console.log(item);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (!event.target.closest('.navbar-search')) {
      this.showSuggestions = false;
    }
  }

  onInputClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // ⬆️⬇️ Keyboard control
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.showSuggestions) return;

    if (event.key === 'ArrowDown') {
      this.activeIndex =
        this.activeIndex < this.suggestions.length - 1
          ? this.activeIndex + 1
          : 0;
    } else if (event.key === 'ArrowUp') {
      this.activeIndex =
        this.activeIndex > 0
          ? this.activeIndex - 1
          : this.suggestions.length - 1;
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      this.selectSuggestion(this.suggestions[this.activeIndex]);
    }
  }

  closeSuggestions() {
    this.showSuggestions = false;
  }

  resetSearch() {
    this.searchText = '';
    this.suggestions = [];
    this.showSuggestions = false;
    this.activeIndex = -1;
  }

  // ****************SEARCH DATA ENDING**********************
// ###################################################################################


toastChecker(){
  this.toastManagerService.show(
    'warn',
    'Success',
    'Neemans Tread Basics Shoes for Men | Walking Shoes | Casual Sneakers for Men Neemans Tread Basics Shoe'
    ,'toast-bottom-center' 
    ,2000,)
  }


}
