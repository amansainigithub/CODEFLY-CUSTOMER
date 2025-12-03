import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecentProductService {
  private readonly STORAGE_KEY = 'recent_products';
  private readonly MAX_ITEMS = 15; // last 10 items store kare

  getRecentProducts(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addProduct(product: any): void {
  let items = this.getRecentProducts();
  let updatedItems: any[] = [];

  // 🟦 Create a reduced object with required fields only
  const recentItem = {
    productId: product.productId,
    productName: product.productName,
    brand: product.brand,
    productMrp: product.productMrp,
    productPrice: product.productPrice,
    productMainImage: product.productMainImage
  };

  // 🔁 Duplicate remove using loop
  for (let i = 0; i < items.length; i++) {
    if (items[i].productId !== recentItem.productId) {
      updatedItems.push(items[i]);
    }
  }

  // 🆕 Add new record at top
  updatedItems.unshift(recentItem);

  // 🧹 Limit storage (Example: 10)
  if (updatedItems.length > this.MAX_ITEMS) {
    updatedItems.pop();
  }

  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedItems));
}


  clearRecent() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
