import { Component } from '@angular/core';
import { OrdersService } from '../../_services/orderServices/orders/orders.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from '../../_services/token-storage.service';
import { ToastManagerService } from '../../_services/toastMangerService/toast-manager.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orderItems: any[] = [];
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  //Filter List For Searching
  filteredItems: any = [];

  constructor(
    private orderService: OrdersService,
    private toastManagerService:ToastManagerService,
    private spinner: NgxSpinnerService,
    private tokenStorageService: TokenStorageService
  ) {}


  ngOnInit(): void {
    this.fetchOrderItems({ page: '0', size: '10' });
  }


  fetchOrderItems(request: any) {
    this.spinner.show();
    const user = this.tokenStorageService.getUser();

    this.orderService.fetchOrderItems(request , user.username).subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.orderItems = res.data['content'];
        this.filteredItems = this.orderItems;

        this.totalElements = res.data['totalElements'];
        this.toastManagerService.show('success','','Data Fetch Success','toast-top-right' ,2000,);

        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toastManagerService.show('error','',err.error.data.message,'toast-top-right' ,2000,);
      },
    });
  }



}
