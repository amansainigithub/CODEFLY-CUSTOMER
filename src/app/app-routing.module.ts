import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CustomerGuardService } from './customerGuard/customer-guard.service';
import { FreshUserRegisterComponent } from './components/fresh-user-register/fresh-user-register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductDetailsComponent } from './productContainer/product-details/product-details.component';
import { ManageAddressComponent } from './customerDashboard/manage-address/manage-address.component';
import { CustomerDashboardComponent } from './customerDashboard/customer-dashboard/customer-dashboard.component';
import { ShoppingCartComponent } from './productContainer/shopping-cart/shopping-cart.component';
import { PaymentCheckoutComponent } from './productContainer/payment-checkout/payment-checkout.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: '', component: HomeComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'passwordSetup', component: FreshUserRegisterComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'pd', component: ProductDetailsComponent },
{ path: 'shopping-cart', component: ShoppingCartComponent },
{
  path: 'customer',canActivate:[CustomerGuardService] ,
      children: [
                  //CUSTOMER PANEL (Customer Panel)
                  { path: 'shopper', component: HomeComponent},
                  { path: 'dashboard', component: CustomerDashboardComponent},
                  { path: 'shipping-address', component: ManageAddressComponent},
                ],
},
{
  path: 'pay',canActivate:[CustomerGuardService] ,
      children: [
                  { path: 'paymentCheckout', component: PaymentCheckoutComponent},
                 
                ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
