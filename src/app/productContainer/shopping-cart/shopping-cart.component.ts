import { Component } from '@angular/core';
import confetti from 'canvas-confetti';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../_services/cartServices/cart.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  
  constructor(
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    public cartService: CartService,
    private tokenStorageService:TokenStorageService,
    private router:Router,
  ) {}

  ngAfterViewInit() {
    this.runCelebration();
  }

  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);


  proceedToPay(){

    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log("User is null, undefined, or an empty object");
      this.router.navigateByUrl('/login');
      return;
    }else{
      this.router.navigateByUrl('pay/proceedToPay');
    }

  }





runCelebration() {
  if (this.cartService.getDiscountPrice() > 0) {
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 1 , x: 0.8 }
      });
    }, 700);
  }
}

}
