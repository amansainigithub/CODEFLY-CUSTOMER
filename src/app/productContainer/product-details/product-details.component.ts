import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../_services/cartServices/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsService } from '../../_services/productContainerServices/productDetailsServices/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productId:any;
  productName:any;
  productData:any;
  mainImage:any;

  constructor(private route: ActivatedRoute , 
    public cartService:CartService,
    private ProductDetailsService:ProductDetailsService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
  const productId = this.route.snapshot.queryParamMap.get('productId');
  const pN = this.route.snapshot.queryParamMap.get('pN');
  const brand = this.route.snapshot.queryParamMap.get('brand');
  const price = this.route.snapshot.queryParamMap.get('price');
  const mrp = this.route.snapshot.queryParamMap.get('mrp');

  console.log("Product ID:", productId);
  console.log("Product Name:", pN);
  console.log("Brand:", brand);
  console.log("Price:", price);
  console.log("MRP:", mrp);

  this.productId = this.route.snapshot.queryParamMap.get('productId');
  this.productName = this.route.snapshot.queryParamMap.get('pN');

  this.getProductDetails()

}


    getProductDetails() {
    this.spinner.show();
    this.ProductDetailsService.getProductDetails(this.productId, this.productName).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productData = res.data.pw;
        this.mainImage = res.data.pw.productMainImage;
        console.log("---------------------");
        
         console.log(this.productData);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toast.error({ detail: 'Error',summary: err.error.data.message, position: 'bottomRight', duration: 3000, });
        console.log(err);
        this.spinner.hide();
      },
    });
  }

   //Change main Image
  changeMainImage(newImage: string) {
    this.mainImage = newImage;
  }

  
  selectSize(size: string) {
    //this.spinner.show();
    this.selectedSize = size;
    this.isOutOfStock = false; 
  
    // setTimeout(() => {
    //   const variant = this.productData.sellerProductVarientResponses.find(
    //     (variant: any) => variant.productLabel === size
    //   );
  
    //   if (variant) {
    //     // Update product details
    //     this.productData.productPrice = variant.productPrice;
    //     this.productData.productMrp = variant.productMrp;
    //     this.productData.calculatedDiscount = variant.calculatedDiscount;
    //     this.productInventory = variant.productInventory;
  
    //     // Check if product is out of stock
    //     this.isOutOfStock = variant.productInventory <= 0;

    //     console.log("OUT OF STOKE " , this.isOutOfStock);
        
    //     this.spinner.hide();
    //   }
    // }, 0); // 1 seconds delay
  }


  addToCartBuyNow(productData: any): void {

    if(this.selectedSize === '')
    {
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

  cartAddToCart(productData: any): void{
    console.log("=========================");
    
    console.log(productData);
    

    if(this.selectedSize === '')
      {
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











  // productData: any;
  // similarProducts: any;
  productReviews :any;

  // Param Collectors
  size: any;
  selectedSize: string | null = null;
  productInventory:any;
  isOutOfStock: boolean = false; // Track stock status
  

 

  




  // "productData": {
  //   "brandField": "Nike",
  //   "productName": "Nike Air Max 270 Running Shoes",
  //   "productPrice": 4499,
  //   "productMrp": 7999,
  //   "calculatedDiscount": "44% Off",
  //   "rating": 4.3,
  //   "reviewCount": 2174,

  //   "productFilesResponses": [
  //     { "fileUrl": "https://picsum.photos/id/1011/600/600" },
  //     { "fileUrl": "https://picsum.photos/id/1012/600/600" },
  //     { "fileUrl": "https://picsum.photos/id/1015/600/600" },
  //     { "fileUrl": "https://picsum.photos/id/1020/600/600" }
  //   ],

  //   "sellerProductVarientResponses": [
  //     { "productLabel": "6", "productInventory": "12" },
  //     { "productLabel": "7", "productInventory": "0" },
  //     { "productLabel": "8", "productInventory": "14" },
  //     { "productLabel": "9", "productInventory": "3" },
  //     { "productLabel": "10", "productInventory": "0" }
  //   ],

  //   "productDetailsResponses": [
  //     { "pdKey": "Material", "pdValue": "Mesh + TPU" },
  //     { "pdKey": "Sole Type", "pdValue": "Rubber Sole" },
  //     { "pdKey": "Warranty", "pdValue": "6 Months Manufacturer" },
  //     { "pdKey": "Ideal For", "pdValue": "Men" }
  //   ],

  //   "description": "<li>Breathable mesh material</li><li>Soft cushioned sole</li><li>Perfect for running and workouts</li>"
  // };

  // "similarProducts": [
  //   {
  //     "id": 101,
  //     "bornCategoryId": 10,
  //     "bornCategoryName": "Running Shoes",
  //     "brandField": "Puma",
  //     "productName": "Puma Velocity Nitro Shoes",
  //     "productPrice": 3999,
  //     "productMrp": 6999,
  //     "calculatedDiscount": "42% Off",
  //     "materialType": "Mesh",
  //     "rating": 4.1,
  //     "reviewCount": 1543,
  //     "productFilesResponses": [
  //       { "fileUrl": "https://picsum.photos/id/1025/600/600" }
  //     ]
  //   },

  //   {
  //     "id": 102,
  //     "bornCategoryId": 10,
  //     "bornCategoryName": "Running Shoes",
  //     "brandField": "Adidas",
  //     "productName": "Adidas Ultraboost 22",
  //     "productPrice": 4999,
  //     "productMrp": 8999,
  //     "calculatedDiscount": "45% Off",
  //     "materialType": "Primeknit",
  //     "rating": 4.6,
  //     "reviewCount": 2874,
  //     "productFilesResponses": [
  //       { "fileUrl": "https://picsum.photos/id/1041/600/600" }
  //     ]
  //   },

  //   {
  //     "id": 103,
  //     "bornCategoryId": 10,
  //     "bornCategoryName": "Running Shoes",
  //     "brandField": "Reebok",
  //     "productName": "Reebok Zig Kinetica Shoes",
  //     "productPrice": 3599,
  //     "productMrp": 6999,
  //     "calculatedDiscount": "48% Off",
  //     "materialType": "Mesh",
  //     "rating": 4.0,
  //     "reviewCount": 987,
  //     "productFilesResponses": [
  //       { "fileUrl": "https://picsum.photos/id/1050/600/600" }
  //     ]
  //   },

  //   {
  //     "id": 104,
  //     "bornCategoryId": 10,
  //     "bornCategoryName": "Running Shoes",
  //     "brandField": "Skechers",
  //     "productName": "Skechers Go Run Elevate",
  //     "productPrice": 2999,
  //     "productMrp": 5999,
  //     "calculatedDiscount": "50% Off",
  //     "materialType": "Air Cooled Foam",
  //     "rating": 4.5,
  //     "reviewCount": 1450,
  //     "productFilesResponses": [
  //       { "fileUrl": "https://picsum.photos/id/1060/600/600" }
  //     ]
  //   }
  // ]



}
