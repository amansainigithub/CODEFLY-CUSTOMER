import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TempPageComponent } from './temp-page/temp-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FreshUserRegisterComponent } from './components/fresh-user-register/fresh-user-register.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgToastModule } from 'ng-angular-popup' // to be added
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import { ProductDetailsComponent } from './productContainer/product-details/product-details.component';
import { ManageAddressComponent } from './customerDashboard/manage-address/manage-address.component';
import { CustomerDashboardComponent } from './customerDashboard/customer-dashboard/customer-dashboard.component';
import { ShoppingCartComponent } from './productContainer/shopping-cart/shopping-cart.component';
import { PaymentCheckoutComponent } from './productContainer/payment-checkout/payment-checkout.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastManagerComponent } from './components/toastManager/toast-manager/toast-manager.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    TempPageComponent,
    FreshUserRegisterComponent,
    ForgotPasswordComponent,
    ProductDetailsComponent,
    ManageAddressComponent,
    CustomerDashboardComponent,
    ShoppingCartComponent,
    PaymentCheckoutComponent,
    ToastManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatStepperModule,
    MatExpansionModule,
    MatSliderModule,
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
