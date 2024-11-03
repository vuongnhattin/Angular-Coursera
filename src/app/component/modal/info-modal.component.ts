import { NgComponentOutlet } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">
        {{ data.header }}
      </h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
    <ng-container *ngComponentOutlet="data.body"/>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-link"
        (click)="activeModal.close('Close click')"
      >
        Đóng
      </button>
    </div>
  `,
  styles: ``
})
export class InfoModalComponent {
  @Input() data: any;
  activeModal = inject(NgbActiveModal);
}
