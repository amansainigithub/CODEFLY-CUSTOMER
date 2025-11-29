import { Component } from '@angular/core';

@Component({
  selector: 'app-toast-manager',
  templateUrl: './toast-manager.component.html',
  styleUrls: ['./toast-manager.component.css']
})
export class ToastManagerComponent {

  toasts: any[] = [];

  // default position
  position: string = 'toast-top-right';

  // dynamically position change karne ke liye method  
  setPosition(pos: 
    'toast-top-left' |
    'toast-top-center' |
    'toast-top-right' |
    'toast-bottom-left' |
    'toast-bottom-center' |
    'toast-bottom-right'
  ) {
    this.position = pos;
  }

  showToast(toast: {
    severity: 'success' | 'error' | 'warn' | 'info' | 'secondary' | 'contrast',
    summary: string,
    detail: string,
    duration?: number
  }) {
    toast.duration = toast.duration ?? 3000;

    this.toasts.push(toast);

    setTimeout(() => this.startCloseAnimation(toast), toast.duration);
  }

  startCloseAnimation(toast: any) {
    toast.closing = true;
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t !== toast);
    }, 250);
  }

  removeToast(toast: any, event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.startCloseAnimation(toast);
  }
}
