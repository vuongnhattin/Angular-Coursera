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
import { Modal } from '../../model/modal.model';
import { NgComponentOutlet } from '@angular/common';
import { CreateCourseForm } from '../form/create-course-form.component';
import { SubmitFormService } from '../../service/submit-form.service';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgComponentOutlet, CreateCourseForm, BaseModalComponent],
  template: `
    <app-base-modal (agree)="onAgree()" [data]="data">
      <ng-container *ngComponentOutlet="data.body; inputs: data.others" />
    </app-base-modal>
  `,
  styles: ``,
})
export class FormModalComponent {
  @Input() data: Modal;
  submitFormService = inject(SubmitFormService);

  onAgree() {
    this.submitFormService.triggerFormSubmit();
  }
}
