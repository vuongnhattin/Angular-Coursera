import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Course } from '../model/course.model';
import { JsonPipe } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    JsonPipe,
    NgbCollapseModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <div class="container" style="padding-left: 300px; overflow-y: auto;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ``,
})
export class CoursePageComponent implements OnInit {
  ngOnInit(): void {
  }
}
