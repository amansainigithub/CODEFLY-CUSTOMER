import { Component } from '@angular/core';

@Component({
  selector: 'app-toast-manager',
  templateUrl: './toast-manager.component.html',
  styleUrl: './toast-manager.component.css'
})
export class ToastManagerComponent {

toasts: any[] = [];

showToast(toast: {
  severity: 'success' | 'error' | 'warn' | 'info' | 'secondary' | 'contrast',
  summary: string,
  detail: string,
  duration?: number
}) {
  
  // agar custom duration diya hai to wahi, nahi to default 3000
  toast.duration = toast.duration ?? 3000;

  this.toasts.push(toast);

  setTimeout(() => this.startCloseAnimation(toast), toast.duration);
}

startCloseAnimation(toast: any) {
  toast.closing = true;
  setTimeout(() => {
    this.toasts = this.toasts.filter(t => t !== toast);
  }, 250); // fadeOut animation time
}

removeToast(toast: any, event?: MouseEvent) {
  if(event) event.stopPropagation();
  this.startCloseAnimation(toast);
}

}
