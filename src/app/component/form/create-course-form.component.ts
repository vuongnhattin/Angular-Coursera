import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SubmitFormService } from '../../service/submit-form.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../model/course.model';
import { BaseFormComponent } from './base-form.component';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-create-course-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form  #form="ngForm" (ngSubmit)="onSubmit(form)" autocomplete="off">
      <div class="mb-3">
        <label for="name" class="form-label">Tên khoá học</label>
        <input
          class="form-control"
          id="name"
          name="name"
          [(ngModel)]="model.name"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <input
          class="form-control"
          id="description"
          name="description"
          [(ngModel)]="model.description"
        />
      </div>
    </form>
  `,
  styles: ``,
})
export class CreateCourseForm extends BaseFormComponent {
  override model = {
    name: '',
    description: '',
  };

  override onSubmit(form: NgForm) {

    this.http.post<Course>(`${environment.apiUrl}/api/courses`, this.model).subscribe(
      (response) => {
        form.form.reset();
        this.toastService.show('Tạo khoá học thành công');
      },
      (error) => {
        for (let obj in error.error) {
          this.toastService.show(error.error[obj], 'error');
        }
      }
    );
  }
}
