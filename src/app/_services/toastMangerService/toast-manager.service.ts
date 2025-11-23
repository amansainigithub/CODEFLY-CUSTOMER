import { Injectable } from '@angular/core';
import { ToastManagerComponent } from '../../components/toastManager/toast-manager/toast-manager.component';

@Injectable({
  providedIn: 'root'
})
export class ToastManagerService {

    private toastComp!: ToastManagerComponent;

// Register toast component globally
register(toastComp: ToastManagerComponent) {
  this.toastComp = toastComp;
}

// Show toast with dynamic values
show(severity: 'success' | 'error' | 'warn' | 'info' | 'secondary' | 'contrast',
  summary: string,
  detail: string,
  duration?: number
) {
  if (!this.toastComp) return;

  this.toastComp.showToast({severity,summary, detail, duration});
}

}
