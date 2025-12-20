import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastManagerService } from '../_services/toastMangerService/toast-manager.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var bootstrap: any; // Import Bootstrap JavaScript


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //OTP FORM
  mobileOtpForm:Boolean = false;

  //RegisterationForm
  registerForm:Boolean = true;

  constructor(
    private authService: AuthService,
    private router:Router,
    private tokenStorageService:TokenStorageService,
    private toastManagerService:ToastManagerService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   var node =  this.tokenStorageService.getUser();
   if(JSON.stringify(node) != '{}'){
    window.location.href = '/home';
   }
  }


FreshUserform: any = {
  mobile: null
};

onSubmitFreshUser()
{
  //Mobile Number Validator
  if (/^\d{10}$/.test(this.FreshUserform.mobile)) 
    {
        console.log('Valid Mobile Number');
    } 
    else 
    {
       this.toastManagerService.show('error','','Invalid Mobile NUmber! Please Enter Ten Digit Mobile No.','toast-top-right' ,2000,);
      return;
    }


    const {mobile} = this.FreshUserform;
    this.authService.registerFreshUser(mobile).subscribe(
      data => {
        if(data.message == "FLY_LOGIN_PAGE"){
          this.toastManagerService.show('error','','User Already Registered please Login.!','toast-top-right' ,3000,);
          // this.router.navigateByUrl('/login');
          return;
        }else{
          this.mobileOtpForm = true;
          this.registerForm = false;
          this.toastManagerService.show('success','','OTP Sent Success','toast-top-right' ,3000,);
          
          //OTP MODEL OPEN
          this.openModal()
        }
      },
      err => {
        console.log(err);
        this.toastManagerService.show('error','','Error.','toast-top-right' ,2000,);
      }
    );

}

   



// ***********************OTP VERIFY WINDOW STARTING***************************

@ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

otp: string[] = ['', '', '', '', '', ''];
isOtpComplete = false;

onOtpInput(event: any, index: number) {
  const value = event.target.value;

  // allow only digits
  if (!/^[0-9]$/.test(value)) {
    event.target.value = '';
    return;
  }

  this.otp[index] = value;

  // move next
  if (index < this.otpInputs.length - 1) {
    this.otpInputs.toArray()[index + 1].nativeElement.focus();
  }

  this.checkOtpComplete();
}

onKeyDown(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace') {
    if (this.otp[index]) {
      this.otp[index] = '';
      this.otpInputs.toArray()[index].nativeElement.value = '';
    } else if (index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
      this.otp[index - 1] = '';
      this.otpInputs.toArray()[index - 1].nativeElement.value = '';
    }

    this.checkOtpComplete();
    event.preventDefault();
  }
}

checkOtpComplete() {
  this.isOtpComplete = this.otp.every(d => d !== '');
}

finalOtp:any;
verifyOtp() {
  if (!this.isOtpComplete) return;
  this.finalOtp = this.otp.join('');
  console.log('OTP Received:', this.finalOtp);
  this.verifyMobileOtp();
}


verifyOtpForm: any = {
  mobileOtp: null,
  username:null
};

verifyMobileOtp(){
  this.spinner.show();
  this.verifyOtpForm.mobileOtp = this.finalOtp;
  this.verifyOtpForm.username = this.FreshUserform.mobile;
  this.authService.verifyMobileOtp(this.verifyOtpForm).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.toastManagerService.show('success','','OTP Verified Success.','toast-top-center' ,3000,);
      this.router.navigateByUrl('/passwordSetup',{ state: { username: this.verifyOtpForm.username  } });
      this.spinner.hide();
      this.closeModal();
    },
     error: (err: any) => {
        console.error('Error saving address:', err);
        this.toastManagerService.show('error','','please Enter Correct OTP.','toast-top-right' ,2000,);
        this.spinner.hide();
      }
  });
}
// ***********************OTP VERIFY  WINDOW ENDING***************************



















  // #################################################################################################################
// ###################################################################################################################
  modal: any;
  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('otpmodel'));
  }

  closeModal() {
    this.modal.hide();
  }

  openModal() {
    this.modal.show();
  }
// #################################################################################################################
// ###################################################################################################################

}
