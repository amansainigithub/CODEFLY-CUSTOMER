import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../_services/cartServices/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsService } from '../../_services/productContainerServices/productDetailsServices/product-details.service';
import { ToastManagerService } from '../../_services/toastMangerService/toast-manager.service';
import { RecentProductService } from '../../_services/RecentProductsService/recent-product.service';

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
  productVariants: any;
  productPrice: any;
  productDiscount: any;
  productMrp: any;
  selectedSize: string | null = null;
  isOutOfStock: boolean = false;
  isLoading: boolean = false;

  mainMedia: any;

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService,
    private ProductDetailsService: ProductDetailsService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private toastManager: ToastManagerService,
    private recentProductService: RecentProductService
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
    this.ProductDetailsService.getProductDetails( this.productId,  this.productName).subscribe({
      next: (res: any) => {
        console.log(res);
        //PRODUCT DETAILS
        this.productData = res.data.pw;

        //PRODYCT VARIANTS (SIZES)
        this.productVariants = res.data.pv;

        //PRODUCT PRICE
        this.productPrice = res.data.pw.productPrice;

        //PRODUCT MRP
        this.productMrp = res.data.pw.productMrp;

        //PRODUCT DISCOUNT
        this.productDiscount = res.data.pw.productDiscount;

        //MEDIA IMAGE FILE URL AND TYPE
        this.mainMedia = {
          url: res.data.pw.productFilesDtos[0].pfileUrl,
          type: res.data.pw.productFilesDtos[0].pfileType
        };


        //ADD TO RECENTLY VIEWED PRODUCTS START
        this.addRecentViewedProduct(this.productData);
        //ADD TO RECENTLY VIEWED PRODUCTS ENDING

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
  changeMainMedia(file: any) {
  this.mainMedia = {
    url: file.pfileUrl,
    type: file.pfileType
  };
}
//Change main Image 


addRecentViewedProduct(productData: any) {
    this.recentProductService.addProduct(productData);
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
    }, 700); // <<< 5M seconds delay
  }

  
}
