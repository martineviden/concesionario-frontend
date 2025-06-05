import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: any = null;
  opacity = 0;
  translateY = -20;
  private subscription: Subscription | null = null;
  private timeout: any;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.toast$.subscribe((toast: Toast | null) => {
      if (toast) {
        this.showToast(toast);
      } else {
        this.hideToast();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private showToast(toast: Toast) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.toast = toast;
    this.opacity = 1;
    this.translateY = 0;

    this.timeout = setTimeout(() => {
      this.hideToast();
    }, toast.duration || 3000);
  }

  private hideToast() {
    this.opacity = 0;
    this.translateY = -20;
    setTimeout(() => {
      this.toast = null;
    }, 300);
  }

  getIcon(): string {
    switch (this.toast?.type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      default:
        return 'fa-info-circle';
    }
  }
} 