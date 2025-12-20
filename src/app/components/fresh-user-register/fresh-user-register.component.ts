import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import Swal from 'sweetalert2';
import { SnackBarHelperService } from '../../_helpers/snackBar_Service/snack-bar-helper.service';
import { ToastManagerService } from '../../_services/toastMangerService/toast-manager.service';

@Component({
  selector: 'app-fresh-user-register',
  templateUrl: './fresh-user-register.component.html',
  styleUrl: './fresh-user-register.component.css',
})
export class FreshUserRegisterComponent {
  
  hidePassword = true;
  hideConfirmPassword = true;

  setupPassForm: any = {
    password: null,
    conformpassword: null,
  };

  receivedData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: SnackBarHelperService,
    private toastManagerService:ToastManagerService,
  ) {
    const state = history.state;
    if (
      state.username == 'undefined' ||
      state.username == null ||
      state.username == '' ||
      state.username == 'null' ||
      state.username == undefined
    ) {
      this.router.navigateByUrl('/register');
    }
    this.setupPassForm.username = state.username;
  }

  ngOnInit() {}

  createAccount() {
    if (this.setupPassForm.password !== this.setupPassForm.conformPassword) {
    this.toastManagerService.show('error','','Password and Confirm Password do not match','toast-top-right' ,2000,);
      return;
    }

    this.authService.registerUser(this.setupPassForm).subscribe(
      (data) => {
        Swal.fire({
          title: 'Congratulations',
          text: 'Account Create Successfully',
          icon: 'success',
        });
        this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err);
        this.toastManagerService.show('error','','Something went wrong | Error','toast-top-right' ,2000,);
      }
    );
  }

}
