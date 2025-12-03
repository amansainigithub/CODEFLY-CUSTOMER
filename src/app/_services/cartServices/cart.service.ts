import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastManagerService } from '../toastMangerService/toast-manager.service';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedSize: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private toastManagerService:ToastManagerService,
    private router: Router,
    private _snackBar:MatSnackBar,
    private tokenStorageService:TokenStorageService,
  ) {
    this.loadCart();  // Load cart when service initializes
  }

  ngOnInit() {
  }

  onSizeChange(selectedSize: string) {
    this.selectedSize = selectedSize;
    console.log('Size changed:', this.selectedSize);
  }

  //Add To Cart Functionality Starting
  private cartItems: any[] = [];

  addToCart(productData: any): void {

    if(!this.tokenStorageService.getToken()){
      this.toastManagerService.show('info','','Please login to add items to cart','toast-top-right' ,2000,);
      this.router.navigateByUrl('/login');
      return
    }

  if (this.cartItems.length >= 10) {
    this.toastManagerService.show('info','','No more items can be added !','toast-top-right' ,2000,);
    return;
  }

  if (!this.selectedSize) {
    this.toastManagerService.show('warn','','Please Select Size','toast-top-right' ,2000,)
    return;
  }

  const productSize = this.selectedSize;
  const productId = productData.productId;

  // 🔥 Get Price, MRP from productSizesDtos based on selected size
  const sizeData = productData.productSizesDtos.find(
    (size: any) => size.productSize === productSize
  );

  if (!sizeData) {
    this.toast.warning({
      detail: 'Error',
      summary: 'Invalid size selected',
      position: 'topRight',
      duration: 2000,
    });
    return;
  }

  const price = Number(sizeData.productPrice);
  const mrp = Number(sizeData.productMrp);
  const discount = Number(((mrp - price) / mrp) * 100).toFixed(2);

  // 🔍 If item already in cart → update quantity
  const existingItem = this.cartItems.find(
    (item) => item.pId === productId && item.pSize === productSize
  );

  if (existingItem) {
    if (existingItem.quantity >= 10) {
      this.toast.warning({
        detail: 'Cart Items',
        summary: 'You can’t add more than 10 quantities of same product.',
        position: 'topRight',
        duration: 2000,
      });
      return;
    }

    existingItem.quantity++;
    existingItem.totalPrice = existingItem.quantity * price;

  } else {
    // 🛍️ Create new Cart Item
    const cartItem = {
      pId: productData.productId,
      pName: productData.productName,
      pPrice: price,
      pBrand: productData.brand,
      pSize: productSize,
      quantity: 1,
      totalPrice: price,
      pFileUrl: productData.productFilesDtos?.[0]?.pfileUrl || '',
      pColor: productData.productColor,
      pMrp: mrp,
      pCalculatedDiscount: discount,
    };

    this.cartItems.push(cartItem);
  }

  this.saveCart();

  //TOAST MANAGER SERVICE USAGE
  this.toastManagerService.show('success','Success','Product Added to Cart','toast-top-right' ,2000,);
}

  

  buyNow(productData: any): void {
    if (!this.selectedSize) {
    //TOAST MANAGER SERVICE USAGE
    this.toastManagerService.show('warn','','Please Select Size','toast-top-right' ,2000,)
      return;
    }
  
    const productSize = this.selectedSize;
    const productId = productData.id;
  
    const existingItem = this.cartItems.find(
      (item) => item.pId === productId && item.pSize === productSize
    );

    
    
  
    if (existingItem) {
      
      if (existingItem.quantity >= 10) {
        this.toast.warning({
          detail: 'Cart Items',
          summary: 'You cant add more than 10 quantities of the same product.',
          position: 'topRight',
          duration: 2000,
        });
        return;
      }

      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.pPrice * existingItem.quantity;
    } else {
      const cartItem = {
        pId: productData.productId,
        pName: productData.productName,
        pPrice: productData.productPrice,
        pBrand: productData.brand,
        pSize: productSize,
        quantity: 1,
        totalPrice: productData.productPrice,
        pFileUrl: productData.productFilesResponses?.[0]?.fileUrl || '',
        pColor: productData.colorVariant,
        pMrp: productData.productMrp,
        pCalculatedDiscount: productData.calculatedDiscount,
      };
      this.cartItems.push(cartItem);
    }
  
    this.saveCart();
    
    //TOAST MANAGER SERVICE USAGE
    this.toastManagerService.show('success','Success','Product Added to Cart','toast-top-right' ,2000,);
  
    this.router.navigateByUrl('/cart');
  }
  

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Convert to string and store in localStorage
  }

  public loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart); // Convert back to array if found
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart'); // Clear localStorage
  }

  removeFromCart(productId: any, productSize: any) {
    this.cartItems = this.cartItems.filter(
      (item) => !(item.pId === productId && item.pSize === productSize)
    );
    this.saveCart();
  }

  updateQuantity(productId: any, productSize: any, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.pId === productId && item.pSize === productSize
    );
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1; // Prevent quantity from going below 1
      item.totalPrice = item.pPrice * item.quantity; // Update total price
      this.saveCart();
    }
  }

  getCartTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + Number(item.totalPrice),
      0
    );
  }

  getCartLength() {
    return this.cartItems.length;
  }

  getTotalMrpPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + Number(item.pMrp) * item.quantity,
      0
    );
  }

  getDiscountPrice(): number {
    return this.getTotalMrpPrice() - this.getCartTotalPrice();
  }
}
