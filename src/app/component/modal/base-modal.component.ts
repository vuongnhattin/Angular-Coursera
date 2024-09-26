import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Modal } from '../../model/modal.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [],
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
      <ng-content></ng-content>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-link"
        (click)="activeModal.close('Close click')"
      >
        Đóng
      </button>
      <button class="btn btn-primary" [class]="buttonType" (click)="onAgree()">Xác nhận</button>
    </div>
  `,
  styles: ``,
})
export class BaseModalComponent {
  @Input() data: Modal;
  @Input() buttonType: string;
  @Output() agree = new EventEmitter();

  activeModal = inject(NgbActiveModal);

  onAgree() {
    this.agree.emit();
  }
}
