import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from '../model/modal.model';
import { NgComponentOutlet } from '@angular/common';
import { CreateCourseForm } from './create-course-form.component';
import { SubmitFormService } from '../service/submit-form.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgComponentOutlet, CreateCourseForm],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ data.header }}</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <ng-container [ngComponentOutlet]="data.body" />
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-link"
        (click)="activeModal.close('Close click')"
      >
        Đóng
      </button>
      <button class="btn btn-primary" (click)="onClick()">Xác nhận</button>
    </div>
  `,
  styles: ``,
})
export class ModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() data: Modal;

  submitFormService = inject(SubmitFormService);

  onClick() {
    this.submitFormService.triggerFormSubmit();
  }
}
