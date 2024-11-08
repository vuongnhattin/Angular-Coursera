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
import {NgFor, NgIf} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../environment/environment';
import { BaseModalComponent } from './modal/base-modal.component';
import { InfoModalComponent } from './modal/info-modal.component';
import { PaypalHelperComponent } from './paypal-helper.component';

@Component({
  selector: 'app-list-course-page',
  standalone: true,
  imports: [
    CourseCardComponent,
    ToastContainerComponent,
    NgbPaginationModule,
    NgFor,
    FormsModule,
    NgIf
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

        <div class="col-auto">
          <button class="btn btn-link" (click)="helpPaypal()">
          <i class="fa-solid fa-clipboard-question"></i> Hướng dẫn đăng nhập Paypal
          </button>
        </div>
      </div>


      <div class="row gx-5" style="height: 430px;">
        @if (loadingCourse === true) {

          <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        @for (course of courses; track course.id) {
          <div class="col-3 gy-3">
            <app-course-card [course]="course" (loadingPayment)="onLoadingPayment($event)"></app-course-card>
          </div>
        }
        @for (item of [].constructor(pageSize - courses.length); track $index) {
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
    <div class="overlay" *ngIf="loadingPayment">
      <div class="spinner"></div>
    </div>
    <app-toast></app-toast>
  `,
  styles: `
    /* parent.component.css */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000; /* Ensure it appears above all other content */
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #0066cc;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    /* Spinner animation */
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
})
export class ListCoursePageComponent implements OnInit {
  courses: Course[] = [];
  loadingCourse = true;

  page = 0;
  pageSize = 0;
  totalElements = 0;
  sortBy = '';
  order = '';
  search = '';

  loadingPayment = false;

  constructor(private http: HttpClient, private oauth: OAuthService) { }

  initPageParams() {
    this.page = 1;
    this.pageSize = 4;
    this.sortBy = 'id';
    this.order = 'desc';
  }

  ngOnInit() {
    this.initPageParams();
    this.getCourses();
    // this.oauth.events.subscribe((event: OAuthEvent) => {
    //   if (event.type === 'token_received') {
    //     this.getCourses();
    //   }
    // });

    if (this.oauth.hasValidAccessToken()) {
      this.getCourses();
    }
  }

  getCourses() {
    this.loadingCourse = true;
    this.http
      .get<Pagination<Course>>(
        `${environment.apiUrl}/api/me/courses?page=${this.page - 1}&size=${this.pageSize
        }&sortBy=${this.sortBy}&order=${this.order}&search=${this.search}`
      )
      .subscribe(response => {
        this.courses = response.data;
        this.page = response.page + 1;
        this.pageSize = response.pageSize;
        this.totalElements = response.totalElements;
        this.loadingCourse = false;
      });
  }

  pageChange() {
    this.courses = [];
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

  onLoadingPayment(loading: boolean) {
    this.loadingPayment = loading;
  }

  helpPaypal() {
    // alert('email: sb-e7vlz33462258@personal.example.com\rpassword: sPB>8&1x')
    const modalRef = this.modalService.open(InfoModalComponent);
    modalRef.componentInstance.data = {
      header: 'Hướng dẫn đăng nhập Paypal',
      body: PaypalHelperComponent
    }
  }
}
