import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../model/course.model';
import { JsonPipe } from '@angular/common';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="container">
      <pre>
        {{ course | json }}
      </pre>
    </div>
  `,
  styles: ``
})
export class CoursePageComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);

  courseId: number;

  course: Course;

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<Course>(
      `http://localhost:8080/api/courses/${this.courseId}`
    ).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.router.navigate(['/error']);
        }
        return throwError(() => error);
      })
    ).subscribe((response) => {
      this.course = response
    })
  }
}
