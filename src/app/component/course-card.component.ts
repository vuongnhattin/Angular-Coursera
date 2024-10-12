import { Component, Inject, inject, input, Input } from '@angular/core';
import { Course } from '../model/course.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card" style="width: 15rem;">
      <img src="https://placehold.co/600x400" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ course().name }}</h5>
        <p class="card-text" style="height: 4rem; overflow-y: auto;">
          {{ course().description }}
        </p>
        <div class="mb-3 col-12 text-center"><i class="fa-solid fa-user"></i>&nbsp; Vai trò: <b>{{course().member === true ? (course().admin === true ? 'Quản trị viên' : 'Thành viên') : 'Chưa tham gia'}}</b></div>
        <div class="col-12 text-center">
          @if (course().member === false) {
            <a class="btn btn-outline-primary" (click)="joinCourse(course().id)">Đăng kí</a>
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

  goToCourse() {
    this.router.navigate(['/course', this.course().id]);
  }

  joinCourse(id: number) {
    this.http.post<any>('http://localhost:8080/api/me/courses', {
      courseId: id
    }).subscribe(response => {
      window.location.reload();
    })
  }
}
