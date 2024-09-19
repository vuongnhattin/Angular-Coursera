import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../model/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: Toast[] = [];

	show(message: string, type: 'success' | 'error' = 'success') {
    let toast: Toast = {
      message: message,
      type: type,
    };
    if (toast.type === 'success') {
      toast.className = 'text-success';
      toast.icon = 'fa-solid fa-check-circle';
    }
    if (toast.type === 'error') {
      toast.className = 'text-danger';
      toast.icon = 'fa-solid fa-circle-exclamation';
    }
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}