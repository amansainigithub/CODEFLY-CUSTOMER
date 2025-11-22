import { Component } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { AddressServiceService } from '../../_services/addressService/address-service.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../_services/cartServices/cart.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { RazorpayService } from '../../_services/payments/razorpayService/razorpay.service';
import { Router } from '@angular/router';

declare var bootstrap: any; // Import Bootstrap JavaScript
declare var Razorpay: any;

@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrl: './payment-checkout.component.css',
})
export class PaymentCheckoutComponent {
  addresses: any = [];
  paymentMode: string = 'ONLINE'; // Default selected payment method
  resell: boolean = false;
  showOnlineButton: any = 'ONLINE'; //Default Selecter ONLINE
  showCodButton: any;

  states: string[] = [
    'Andhra Pradesh',
    'Bihar',
    'Delhi',
    'Gujarat',
    'Karnataka',
    'Maharashtra',
    'Rajasthan',
    'Tamil Nadu',
    'Uttar Pradesh',
    'West Bengal',
  ];

  updateAddressForm: any = {
    country: 'INDIA',
    customerName: null,
    mobileNumber: null,
    area: null,
    postalCode: null,
    addressLine1: null,
    addressLine2: null,
    defaultAddress: null,
  };

  constructor(
    private addressService: AddressServiceService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    public cartService: CartService,
    private tokenStorageService: TokenStorageService,
    private razorpayService: RazorpayService,
    private router: Router
  ) {}

  // MODEL UPDATE SHIPPING ADDRESS AND SUCCESS MODEL STARTING
  updateShippingAddressModel: any;
  successModel: any;
  ngAfterViewInit() {
    this.updateShippingAddressModel = new bootstrap.Modal( document.getElementById('updateShippingAddressModel'));
    this.successModel = new bootstrap.Modal(document.getElementById('successModal'));
  }
  closeModal() {
    this.updateShippingAddressModel.hide();
  }
  closeSuccessModel() {
    this.successModel.hide();
  }
  // MODEL UPDATE SHIPPING ADDRESS AND SUCCESS MODEL STARTING





  //################################## STEPPER 1 STARTNG ##############################
  //#####################################################################################
  ngOnInit(): void {
    console.log(this.cartService.getCartLength());

    if (this.cartService.getCartLength() <= 0) {
      this.toast.success({
        detail: 'Success',
        summary: 'Please Add Some Items to cart !! ',
        position: 'bottomRight',
        duration: 2000,
      });
      this.router.navigateByUrl('/home');
    }

    this.getAddress();
  }

  //************************* ADDRESS **************************
  async getAddress() {
    this.spinner.show();
    this.addressService.getAddressList().subscribe({
      next: (res: any) => {
        this.addresses = res.data;

        //Sort Address
        this.sortAddresses();

        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong',
          position: 'bottomRight',
          duration: 2000,
        });
        this.spinner.hide();
      },
    });
  }

  sortAddresses() {
    this.addresses = this.addresses.sort(
      (a: any, b: any) => Number(b.defaultAddress) - Number(a.defaultAddress)
    );
  }
  //**************************  GET ADDRESS ENDING **************************

  //**************************  SET DEFAULT ADDRESS **************************
  setDefaultAddress(id: any) {
    this.spinner.show();
    this.addressService.setDefaultAddress(id).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Address Removed',
          position: 'bottomRight',
          duration: 2000,
        });
        this.spinner.hide();

        //get Address List
        this.getAddress();
      },
      error: (err: any) => {
        console.error('Delete Failed', err);
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong',
          position: 'bottomRight',
          duration: 2000,
        });
        this.spinner.hide();
      },
    });
  }
  //**************************  SET DEFAULT ADDRESS ENDING **************************

  //**************************   GET ADDRESS BY ID **************************
  getAddressById(id: any) {
    //Progress bar Show
    this.spinner.show();
    //Model Open
    this.updateShippingAddressModel.show();

    this.addressService.getAddressById(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.updateAddressForm = res.data;
        this.spinner.hide();
        // this.showForm = this.addresses.length === 0; // Show form only if no addresses exist
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong',
          position: 'bottomRight',
          duration: 2000,
        });
        this.spinner.hide();
      },
    });
  }
  //**************************   GET ADDRESS BY ID ENDING **************************

  //**************************  UPDATE ADDRESS **************************
  saveUpdateAddress() {
    this.spinner.show();
    this.addressService.updateAddress(this.updateAddressForm).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Address Updated',
          position: 'bottomRight',
          duration: 2000,
        });
        this.spinner.hide();

        this.closeModal();

        this.getAddress();
      },
      error: (err: any) => {
        console.error('Error saving address:', err);
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong',
          position: 'bottomRight',
          duration: 2000,
        });
        this.spinner.hide();
      },
    });
  }
  //************************** UPDATE ADDRESS ENDING **************************

  //**************************  ADDRESS ENDING **************************

  //**********************SELECTED ADDRESS**********************
  selectedAddressIndex: number | null = null;
  addressHolder: any = '';
  onAddressSelect(address: any) {
    this.addressHolder = address;
  }

  nextStep(stepper: MatStepper) {
    if (
      this.addressHolder === '' ||
      this.addressHolder === null ||
      this.addressHolder === undefined
    ) {
      this.toast.warning({
        detail: 'Success',
        summary: 'Please select a delivery address before proceeding.',
        position: 'bottomRight',
        duration: 3000,
      });
      return;
    }

    if (
      this.selectedAddressIndex !== null &&
      this.selectedAddressIndex !== undefined
    ) {
      stepper.next();
    } else {
      this.toast.success({
        detail: 'Success',
        summary: 'Please select a delivery address before proceeding.',
        position: 'bottomRight',
        duration: 3000,
      });
    }
  }

  prevStep(stepper: MatStepper) {
    stepper.previous();
  }

  complete() {
    alert('Stepper completed!');
  }
  //**********************SELECTED ADDRESS ENDING**********************

  //##################################### STEPPER 1 ENDING ##########################################
  //#################################################################################################

  //#####################################  STEPPER 2 STARING #####################################
  //Selected Paymenod Mode
  selectPayment(method: string) {
    this.paymentMode = method;
    if (this.paymentMode === 'COD') {
      this.showCodButton = true;
      this.showOnlineButton = false;
    } else if (this.paymentMode === 'ONLINE') {
      this.showOnlineButton = true;
      this.showCodButton = false;
    }
  }

  //##################################### PAYMENT STARTING PROCESS #####################################
  //************************** PAYMENT ONLINE STARTING **************************
  payLoader: any = false;
  //Razorpay Integration Working Starting
  razorpayKey = 'rzp_test_cFBctGmM8MII0E';
  amountPaying_Online(amount: any) {
    // Pay Loader Starting...
    this.payLoader = true;

    if (
      this.addressHolder === '' ||
      this.addressHolder === null ||
      this.addressHolder === undefined
    ) {
      this.toast.warning({
        detail: 'Warning',
        summary: 'Please select a delivery address before proceeding.',
        position: 'bottomRight',
        duration: 3000,
      });
      this.payLoader = false;
      return;
    }

    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log('User is null, undefined, or an empty object');
      this.router.navigateByUrl('/login');
      this.payLoader = false;
      return;
    }

    // Check isValid Cart items
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const addressId = this.addressHolder.id;
    console.log('Selected address ID:', addressId);

    this.razorpayService
      .createOrderPaymentService(amount, addressId, cart)
      .subscribe({
        next: (res: any) => {
          this.payLoader = false;
          const parsedResponse = JSON.parse(res.data);

          const options = {
            key: this.razorpayKey,
            amount: parsedResponse.amount,
            currency: 'INR',
            name: 'Shoppers',
            description: 'Ecommerce Platform',
            order_id: parsedResponse.id,
            handler: (response: any) => {
            console.log('Payment Success:', response);

              // Update Payment to Database
              this.paymentUpdate(response, cart);

              // Clear Cart Items
              this.cartService.clearCart();

              // Redirect to home
              this.router.navigateByUrl('/home');
            },
            prefill: {
              name: this.addressHolder.customerName,
              email: 'testing@example.com',
              contact: this.addressHolder.mobileNumber,
            },
            theme: {
              color: '#3399cc',
            },
            modal: {
              escape: false,
              backdropclose: false,
              ondismiss: () => {
                // console.log('Payment popup closed by user');
                // alert('Payment popup closed before completing the transaction.');

                this.toast.error({
                  detail: 'Payment Error',
                  summary: 'Cancle to initiate payment. Please try again.',
                  position: 'topRight',
                  duration: 2000,
                });
              },
            },
          };

          const rzp = new Razorpay(options);
          rzp.open();
        },
        error: (err: any) => {
          this.payLoader = false;
          this.toast.error({
            detail: 'Payment Error',
            summary: 'Please try again | Something Went Wrong',
            position: 'bottomRight',
            duration: 2000,
          });
        },
      });
  }

  paymentUpdate(paymentTransaction: any, cart: any) {
    paymentTransaction.cartItems = cart; // Add cart to the paymentTransaction object
    console.log(paymentTransaction); // Check the updated object before sending

    this.razorpayService.paymentTransaction(paymentTransaction).subscribe(
      (data) => {
        //Redirect to success page
        this.router.navigateByUrl('/pay/orderPlacedSuccess');
      },
      (err) => {
        alert('Registeration Failed');
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  //************************** PAYMENT ONLINE ENDING **************************

  // ************************* PAYMENT COD STARTING **************************
  amountPaying_Cod(amount: any) {
    // Pay Loader Starting...
    this.payLoader = true;

    if (
      this.addressHolder === '' ||
      this.addressHolder === null ||
      this.addressHolder === undefined
    ) {
      this.toast.warning({
        detail: 'Success',
        summary: 'Please select a delivery address before proceeding.',
        position: 'bottomRight',
        duration: 3000,
      });
      return;
    }

    const user = this.tokenStorageService.getUser();
    if (!user || Object.keys(user).length === 0) {
      console.log('User is null, undefined, or an empty object');
      this.router.navigateByUrl('/login');
      return;
    }

    //Check isValid Cart items
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log(cart); // Check if cart is correctly retrieved
    const addressId = this.addressHolder.id;
    console.log(addressId);

    this.razorpayService
      .codOrderPaymentService(amount, addressId, cart)
      .subscribe({
        next: (res: any) => {
          //Show COD MODEL
          this.successModel.show();

          this.showSuccess = false;
          // Wait for 6s, then show success message
          setTimeout(() => {
            this.showSuccess = true;
          }, 5000);

          //Clear Cart Items
          this.cartService.clearCart();

          // Pay Loader Starting...
          this.payLoader = false;
        },
        error: (err: any) => {
          console.error('Error Creating COD Order:', err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error Creating COD Order:',
            position: 'bottomRight',
            duration: 2000,
          });
          this.spinner.hide();

          // Pay Loader Starting...
          this.payLoader = false;
        },
      });
  }
  //*********************** PAYMENT COD ENDING ************************
  //######################## PAYMENT STARTING PROCESS ##################
  //########################  STEPPER 2 STARING ########################

  //COD MODEL SHOW TO SHOW SUCCESS ORDER CREATION SATRTING
  showSuccess = false; // Initially, success message is hidden

  startAnimation() {
    this.showSuccess = false; // Reset success message

    // Wait for 6s, then show success message
    setTimeout(() => {
      this.showSuccess = true;
    }, 4000);
  }
  //COD MODEL SHOW TO SHOW SUCCESS ORDER CREATION SATRTING
}
