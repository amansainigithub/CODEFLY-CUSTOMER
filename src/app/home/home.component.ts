import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomePageService } from '../_services/homePageService/homePage/home-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  readonly panelOpenState = signal(false);

  constructor(private homePageService: HomePageService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getHomePageData();
  }


    sliderData:any;
    productData:any


    getHomePageData() {
    this.spinner.show();
    this.homePageService.getHomePage().subscribe({
      next: (res: any) => {
        this.sliderData = res.data.sliderDtoList;
        this.productData = res.data.productDetailsList
        console.log(res);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toast.error({ detail: 'Error',summary: err.error.data.message, position: 'bottomRight', duration: 3000, });
        console.log(err);
        this.spinner.hide();
      },
    });
  }









// ##################################################################################################

productsList = [
  {
    id: "101",
    productName: "Men's Cotton Casual Shirt",
    brandField: "Roadster",
    materialType: "Cotton",
    productFirstSize: "M",
    netQuantity: 12,
    productPrice: 699,
    productMrp: 1299,
    calculatedDiscount: "46% OFF",
    rating: 4.3,
    reviewCount: 221,
    productFilesResponses: [
      {
        fileUrl: "https://picsum.photos/400/500?random=1"
      }
    ]
  },
  {
    id: "102",
    productName: "Women's Stylish Printed Top",
    brandField: "Biba",
    materialType: "Rayon",
    productFirstSize: "L",
    netQuantity: 8,
    productPrice: 799,
    productMrp: 1499,
    calculatedDiscount: "47% OFF",
    rating: 4.6,
    reviewCount: 310,
    productFilesResponses: [
      {
        fileUrl: "https://picsum.photos/400/500?random=2"
      }
    ]
  },
  {
    id: "103",
    productName: "Bluetooth Wireless Earbuds",
    brandField: "Boat",
    materialType: "Plastic",
    productFirstSize: "Free",
    netQuantity: 0,
    productPrice: 1299,
    productMrp: 2999,
    calculatedDiscount: "57% OFF",
    rating: 4.1,
    reviewCount: 1189,
    productFilesResponses: [
      {
        fileUrl: "https://picsum.photos/400/500?random=3"
      }
    ]
  },
  {
    id: "104",
    productName: "Men's Sports Running Shoes",
    brandField: "Adidas",
    materialType: "Mesh",
    productFirstSize: "9",
    netQuantity: 15,
    productPrice: 1799,
    productMrp: 3999,
    calculatedDiscount: "55% OFF",
    rating: 4.7,
    reviewCount: 965,
    productFilesResponses: [
      {
        fileUrl: "https://picsum.photos/400/500?random=4"
      }
    ]
  },
  {
    id: "105",
    productName: "Women's Soft Silk Saree",
    brandField: "Kanjivaram",
    materialType: "Silk",
    productFirstSize: "Free",
    netQuantity: 5,
    productPrice: 1599,
    productMrp: 3499,
    calculatedDiscount: "54% OFF",
    rating: 4.5,
    reviewCount: 420,
    productFilesResponses: [
      {
        fileUrl: "https://picsum.photos/400/500?random=5"
      }
    ]
  },
  {
    id: "106",
    productName: "Smart Fitness Band with Heart Rate Monitor",
    brandField: "Noise",
    materialType: "Silicon",
    productFirstSize: "Free",
    netQuantity: 20,
    productPrice: 999,
    productMrp: 2499,
    calculatedDiscount: "60% OFF",
    rating: 4.4,
    reviewCount: 1580,
    productFilesResponses: [
      {
        fileUrl: "https://picsum.photos/400/500?random=6"
      }
    ]
  }
];


// =============================================================



}
