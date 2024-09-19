import { Component, inject, input, Input } from '@angular/core';
import { Course } from '../model/course.model';
import { Router } from '@angular/router';

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
        <div class="col-12 text-center">
          <a class="btn btn-primary" (click)="goToCourse()">Truy cập</a>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CourseCardComponent {
  course = input.required<Course>();
  router = inject(Router);

  goToCourse() {
    this.router.navigate(['/courses', this.course().id]);
  }
}
