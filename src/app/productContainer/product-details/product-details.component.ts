import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../_services/cartServices/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsService } from '../../_services/productContainerServices/productDetailsServices/product-details.service';
import { ToastManagerService } from '../../_services/toastMangerService/toast-manager.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productId: any;
  productName: any;
  productBrand: any;
  productData: any;
  mainImage: any;
  productPrice: any;
  productDiscount: any;
  productMrp: any;
  selectedSize: string | null = null;
  isOutOfStock: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService,
    private ProductDetailsService: ProductDetailsService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private toastManager: ToastManagerService
  ) {}

  ngOnInit(): void {
    // const productId = this.route.snapshot.queryParamMap.get('productId');
    // const pN = this.route.snapshot.queryParamMap.get('pN');
    // const brand = this.route.snapshot.queryParamMap.get('brand');
    // const price = this.route.snapshot.queryParamMap.get('price');
    // const mrp = this.route.snapshot.queryParamMap.get('mrp');
    // console.log("Product ID:", productId);
    // console.log("Product Name:", pN);
    // console.log("Brand:", brand);
    // console.log("Price:", price);
    // console.log("MRP:", mrp);

    this.productId = this.route.snapshot.queryParamMap.get('productId');
    this.productName = this.route.snapshot.queryParamMap.get('pN');
    this.productBrand = this.route.snapshot.queryParamMap.get('brand');

    this.getProductDetails();
  }

  getProductDetails() {
    this.spinner.show();
    this.ProductDetailsService.getProductDetails(
      this.productId,
      this.productName
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productData = res.data.pw;
        this.mainImage = res.data.pw.productMainImage;
        this.productPrice = res.data.pw.productPrice;
        this.productMrp = res.data.pw.productMrp;
        this.productDiscount = res.data.pw.productDiscount;

        this.spinner.hide();
      },
      error: (err: any) => {
        this.toast.error({
          detail: 'Error',
          summary: err.error.data.message,
          position: 'bottomRight',
          duration: 3000,
        });
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  //Change main Image
  changeMainImage(newImage: string) {
    this.mainImage = newImage;
  }

  // ##### ADD TO CART ######
  productAddToCart(productData: any): void {
    // console.log(productData);
    if (this.selectedSize === '') {
      this.toast.warning({
        detail: 'Hey,',
        summary: 'Please Select Size.',
        position: 'topRight',
        duration: 2000,
      });
      return;
    }
    this.cartService.addToCart(productData);
  }

  // ##### BUY NOW ######
  addToCartBuyNow(productData: any): void {
    if (this.selectedSize === '') {
      this.toast.warning({
        detail: 'Hey,',
        summary: 'Please Select Size.',
        position: 'topRight',
        duration: 2000,
      });
      return;
    }
    this.cartService.buyNow(productData);
  }


  


  selectSize(finalSelectedSize: string, productSizes: any) {
    this.isLoading = true; // blur + loader ON
    setTimeout(() => {
      this.selectedSize = finalSelectedSize;
      this.isOutOfStock = false;
      this.productPrice = productSizes.productPrice;
      this.productMrp = productSizes.productMrp;
      this.productDiscount = productSizes.productDiscount;

      this.isLoading = false; // blur + loader OFF
    }, 1500); // <<< 3 seconds delay
  }

  
}
