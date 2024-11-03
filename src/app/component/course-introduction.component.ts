import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../model/course.model';
import {environment} from "../../environment/environment";

@Component({
  selector: 'app-course-introduction',
  standalone: true,
  imports: [BreadcrumbComponent, MarkdownModule],
  template: `
    <app-breadcrumb
      [data]="[
        { name: 'Trang chủ', url: '/' },
        { name: 'Giới thiệu', url: '' }
      ]"
    ></app-breadcrumb>
    <markdown class="variable-binding" [data]="markdown"></markdown>
  `,
  styles: ``,
})
export class CourseIntroductionComponent implements OnInit {
  markdown: string = '';
  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  courseId: number;

  ngOnInit(): void {
    this.courseId = Number(
      this.route.parent?.parent?.snapshot.paramMap.get('courseId')
    );
    this.http
      .get<Course>(`${environment.apiUrl}/api/courses/${this.courseId}`)
      .subscribe((response) => {
        this.markdown = response.introduction;
      });
  }
}
