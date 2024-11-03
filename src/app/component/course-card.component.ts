import {Component, EventEmitter, Inject, inject, input, Input, Output} from '@angular/core';
import { Course } from '../model/course.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import {async} from "rxjs";

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card" style="width: 15rem;">
      <img src="https://placehold.co/600x400" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ course().name }}</h5>
        <p class="card-text" style="height: 4rem; overflow-y: auto; white-space: pre-line;">
          {{ course().description }}
        </p>
        <div class="mb-3 col-12 text-center"><i class="fa-solid fa-user"></i>&nbsp; Vai trò: <b>{{course().member === true ? (course().admin === true ? 'Quản trị viên' : 'Thành viên') : 'Chưa tham gia'}}</b></div>
        <div class="col-12 text-center">
          @if (course().member === false) {
            <a class="btn btn-outline-primary" (click)="joinCourse(course().id)">$ {{course().price}}</a>
          }
          @else {
            <a class="btn btn-primary" (click)="goToCourse()">Truy cập</a>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CourseCardComponent {
  course = input.required<Course>();
  router = inject(Router);
  http = inject(HttpClient);

  @Output() loadingPayment = new EventEmitter<boolean>();

  goToCourse() {
    this.router.navigate(['/course', this.course().id]);
  }

  async joinCourse(courseId: number) {
    this.loadingPayment.emit(true);
    const paymentResponse : any = await this.http.post(`${environment.apiUrl}/api/paypal/create-order?courseId=${courseId}`, {}).toPromise();
    window.location.href = paymentResponse['redirectUrl'];
    // this.loadingPayment.emit(false);
  }
}
