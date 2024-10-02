import { HttpClient } from '@angular/common/http';
import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Pagination } from '../model/pagination.model';
import { Course } from '../model/course.model';
import { CourseCardComponent } from './course-card.component';
import { AuthService } from '../service/auth.service';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './modal/form-modal.component';
import { Modal } from '../model/modal.model';
import { CreateCourseForm } from './form/create-course-form.component';
import { ToastService } from '../service/toast.service';
import { ToastContainerComponent } from './toast-container.component';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-course-page',
  standalone: true,
  imports: [
    CourseCardComponent,
    ToastContainerComponent,
    NgbPaginationModule,
    NgFor,
    FormsModule,
  ],
  template: `
    <div class="col text-center h2 mb-4">Danh sách khoá học</div>
    <div class="container">
      <div class="row gx-4">
        <div class="col-auto">
          <form #searchCourseForm="ngForm" (ngSubmit)="onSearch()">
            <div class="input-group">
              <span class="input-group-text"
                ><i class="fa-solid fa-search"></i
              ></span>
              <input
                type="text"
                class="form-control"
                placeholder="Tìm khoá học"
                [(ngModel)]="search"
                name=" "
              />
              <button class="btn btn-primary">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>

        <div class="col-auto">
          <button class="btn btn-outline-primary" (click)="open()">
            + Thêm khoá học
          </button>
        </div>

        <div class="col-auto">
          <button class="btn btn-link" (click)="getCourses()">
            <i class="fa-solid fa-rotate-right"></i> Refresh
          </button>
        </div>
      </div>

      <div class="row gx-5">
        @for (course of courses; track course.id) {
        <div class="col-3 gy-3">
          <app-course-card [course]="course"></app-course-card>
        </div>
        } @for (item of [].constructor(pageSize - courses.length); track $index)
        {
        <div></div>
        }
      </div>
      <div class="col-12 d-flex justify-content-center mt-4">
        <ngb-pagination
          [collectionSize]="totalElements"
          [pageSize]="pageSize"
          [(page)]="page"
          [maxSize]="5"
          [boundaryLinks]="true"
          (pageChange)="pageChange()"
        />
      </div>
    </div>
    <app-toast></app-toast>
  `,
  styles: ``,
})
export class ListCoursePageComponent implements OnInit {
  courses: Course[] = [];

  page = 0;
  pageSize = 0;
  totalElements = 0;
  sortBy = '';
  order = '';
  search = '';

  constructor(private http: HttpClient, private oauth: OAuthService) {}

  initPageParams() {
    this.page = 1;
    this.pageSize = 4;
    this.sortBy = 'id';
    this.order = 'desc';
  }

  ngOnInit() {
    this.initPageParams();
    this.oauth.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        this.getCourses();
      }
    });

    if (this.oauth.hasValidAccessToken()) {
      this.getCourses();
    }
  }

  getCourses() {
    this.http
      .get<Pagination<Course>>(
        `http://localhost:8080/api/me/courses?page=${this.page - 1}&size=${
          this.pageSize
        }&sortBy=${this.sortBy}&order=${this.order}&search=${this.search}`
      )
      .subscribe(response => {
        this.courses = response.data;
        this.page = response.page + 1;
        this.pageSize = response.pageSize;
        this.totalElements = response.totalElements;
      });
  }

  pageChange() {
    this.getCourses();
  }

  private modalService = inject(NgbModal);

  modal: Modal = {
    header: 'Thêm khoá học',
    body: CreateCourseForm,
  };

  open() {
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.data = this.modal;
  }

  onSearch() {
    this.initPageParams();
    this.getCourses();
  }
}
