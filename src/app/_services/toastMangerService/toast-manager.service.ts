import { Injectable } from '@angular/core';
import { ToastManagerComponent } from '../../components/toastManager/toast-manager/toast-manager.component';

@Injectable({
  providedIn: 'root'
})
export class ToastManagerService {

  private toastComp!: ToastManagerComponent;

  register(toastComp: ToastManagerComponent) {
    this.toastComp = toastComp;
  }

  show(
    severity: 'success' | 'error' | 'warn' | 'info' | 'secondary' | 'contrast',
    summary: string,
    detail: string,
    position:
      'toast-top-left' |
      'toast-top-center' |
      'toast-top-right' |
      'toast-bottom-left' |
      'toast-bottom-center' |
      'toast-bottom-right' = 'toast-top-right',
      duration: number = 3000,
  ) {
    if (!this.toastComp) return;

    // Dynamic position set
    this.toastComp.setPosition(position);

    // Toast call
    this.toastComp.showToast({ severity, summary, detail, duration });
  }
}
