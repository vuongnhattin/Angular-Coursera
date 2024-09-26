import { Component } from '@angular/core';
import { BreadcrumbComponent } from "./breadcrumb.component";

@Component({
  selector: 'app-course-introduction',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
  <app-breadcrumb
      [data]="[
        { name: 'Trang chủ', url: '/' },
        { name: 'Giới thiệu', url: '' }
      ]"
    ></app-breadcrumb>
    <p>
      course-introduction works!
    </p>
  `,
  styles: ``
})
export class CourseIntroductionComponent {

}
