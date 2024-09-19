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
import { SubmitFormService } from '../service/submit-form.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course.model';

@Component({
  selector: 'app-create-course-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form  #createCourseForm="ngForm" (ngSubmit)="onSubmit(createCourseForm)">
      <div class="mb-3">
        <label for="name" class="form-label">Tên khoá học</label>
        <input
          class="form-control"
          id="name"
          name="name"
          [(ngModel)]="form.name"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <input
          class="form-control"
          id="description"
          name="description"
          [(ngModel)]="form.description"
        />
      </div>
      <!-- <button class="btn btn-primary">Submit</button> -->
    </form>
  `,
  styles: ``,
})
export class CreateCourseForm implements OnInit, OnDestroy {
  submitFormService = inject(SubmitFormService);
  private subscription!: Subscription;
  toastService = inject(ToastService);
  http = inject(HttpClient);

  form = {
    name: '',
    description: '',
  };

  @ViewChild('createCourseForm') createCourseForm!: NgForm;

  ngOnInit(): void {
    this.subscription = this.submitFormService.submitForm$.subscribe(() => {
      this.onSubmit(this.createCourseForm);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(createCourseForm: NgForm) {
    this.http.post<Course>('http://localhost:8080/api/courses', this.form).subscribe(
      (response) => {
        createCourseForm.form.reset();
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
