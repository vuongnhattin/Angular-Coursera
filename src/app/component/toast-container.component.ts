import { Component, inject } from '@angular/core';
import { ToastService } from '../service/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  template: `
    @for (toast of toastService.toasts; track toast) {
      <ngb-toast
				[autohide]="true"
				[delay]="3000"
        [class]="[toast.className, 'fw-bold']"
				(hidden)="toastService.remove(toast)"
			>
      <i [class]="toast.icon"></i> &nbsp; {{toast.message}}
			</ngb-toast>
    }
  `,
  styles: ``,
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
}
