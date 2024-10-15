import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PipeTransform } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Course } from '../model/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastContainerComponent } from './toast-container.component';
import { ToastService } from '../service/toast.service';
import { BreadcrumbComponent } from './breadcrumb.component';
import { DeleteModalComponent } from './modal/delete-modal.component';
import {
  NgbHighlight,
  NgbModal,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Modal } from '../model/modal.model';
import { DeleteModalSharedService } from '../service/delete-modal-shared.service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { UserCourse } from '../model/user-course.model';
import { debounceTime, map, Observable, pipe, startWith } from 'rxjs';
import { List } from '../model/list.model';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Member } from '../model/member.model';
import {
  LMarkdownEditorModule,
  MdEditorOption,
  UploadResult,
} from 'ngx-markdown-editor';

@Component({
  selector: 'app-course-admin',
  standalone: true,
  imports: [
    FormsModule,
    ToastContainerComponent,
    BreadcrumbComponent,
    NgbNavModule,
    NgbHighlight,
    AsyncPipe,
    ReactiveFormsModule,
    LMarkdownEditorModule,
  ],
  template: `
    <div class="container">
      <app-breadcrumb
        [data]="[
          { name: 'Trang chủ', url: '/' },
          { name: 'Quản lý khoá học', url: '' }
        ]"
      >
      </app-breadcrumb>

      <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
        <li [ngbNavItem]="1">
          <button ngbNavLink>Thông tin khoá học</button>
          <ng-template ngbNavContent>
            @if (course) {

            <form
              #form="ngForm"
              (ngSubmit)="courseSubmit(form)"
              autocomplete="off"
            >
              <div class="mb-3">
                <label for="name" class="form-label">Tên khoá học</label>
                <input
                  class="form-control"
                  id="name"
                  name="name"
                  [(ngModel)]="course.name"
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Mô tả</label>
                <textarea
                  class="form-control"
                  id="description"
                  name="description"
                  [(ngModel)]="course.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="introduction" class="form-label"
                  >Giới thiệu khoá học (markdown)</label
                >
                <textarea
                  class="form-control"
                  id="introduction"
                  name="introduction"
                  [(ngModel)]="course.introduction"
                  style="height: 250px;"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-outline-primary">
                Thay đổi
              </button>
              <button
                type="button"
                class="btn btn-danger ms-2"
                (click)="openDeleteCourse()"
              >
                Xoá khoá học
              </button>
            </form>
            }
          </ng-template>
        </li>
        <li [ngbNavItem]="2">
          <button ngbNavLink>Quản lý thành viên</button>
          <ng-template ngbNavContent>
            <form>
              <div class="mb-3 row">
                <label
                  for="table-filtering-search"
                  class="col-xs-3 col-sm-auto col-form-label fw-bold"
                  >Tìm kiếm</label
                >
                <div class="col-xs-3 col-sm-auto">
                  <input
                    id="table-filtering-search"
                    class="form-control"
                    type="text"
                    [formControl]="filter"
                  />
                </div>
              </div>
            </form>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên đăng nhập</th>
                  <th scope="col">Email</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                @for (user of filterdUsers; track $index; let i = $index) {
                <tr>
                  <th scope="row">{{ i + 1 }}</th>
                  <td>
                    <ngb-highlight
                      [result]="user.username ? user.username : ''"
                      [term]="filter.value"
                    />
                  </td>
                  <td>
                    <ngb-highlight
                      [result]="user.email ? user.email : ''"
                      [term]="filter.value"
                    />
                  </td>
                  <td>
                    <ngb-highlight
                      [result]="user.fullName"
                      [term]="filter.value"
                    />
                  </td>
                  <td>
                    <ngb-highlight
                      [result]="user.adminString"
                      [term]="filter.value"
                    />
                  </td>
                  <td>
                    @if (user.admin === true) {
                    <button class="btn btn-link" (click)="changeRole(user.id)">
                      Giáng chức
                    </button>
                    } @else {
                    <button class="btn btn-link" (click)="changeRole(user.id)">
                      Thăng chức
                    </button>
                    }
                    <button class="btn btn-link ms-2">Xoá</button>
                  </td>
                </tr>
                } @empty {
                <tr>
                  <td colspan="6" style="text-align: center">
                    Không có dữ liệu
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </ng-template>
        </li>
      </ul>

      <div [ngbNavOutlet]="nav" class="mt-2"></div>

      <app-toast></app-toast>
    </div>
  `,
  styles: ``,
})
export class CourseAdminComponent implements OnInit {
  active = 1;
  course: Course;
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastService);
  modalService = inject(NgbModal);
  deleteModalSharedService = inject(DeleteModalSharedService);
  auth = inject(AuthService);

  courseId: number;

  users: UserCourse[];
  filterdUsers: UserCourse[];
  filter = new FormControl('', { nonNullable: true });

  deleteCourseModal: Modal = {
    id: 'delete-course',
    header: 'Xoá khoá học',
    body: 'Bạn có chắc chắn muốn xoá khoá học này không?',
  };

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe((params) => {
      this.courseId = params['courseId'];
      this.checkAdmin();
      if (this.courseId) {
        this.http
          .get<Course>(`http://localhost:8080/api/courses/${this.courseId}`)
          .subscribe((response) => {
            this.course = response;
          });
      }
    });

    this.deleteModalSharedService.data$.subscribe((data) => {
      if (data === 'delete-course') {
        this.deleteCourse();
      }
    });

    this.http
      .get<List<UserCourse>>(
        `http://localhost:8080/api/courses/${this.courseId}/members`
      )
      .subscribe((res) => {
        this.users = res.data;
        this.users.forEach((user) => {
          user.adminString = user.admin ? 'Quản trị viên' : 'Thành viên';
          user.fullName = user.firstName + ' ' + user.lastName;
        });
        this.users = this.users.filter((user) => {
          return user.id && user.id !== this.auth.getUserId();
        });
        this.filterdUsers = this.users;
      });

    this.doSearchFilter();
  }

  checkAdmin() {
    this.http
      .get<Member>(`http://localhost:8080/api/me/members/${this.courseId}`)
      .subscribe((response) => {
        if (!response.admin) {
          this.router.navigate(['']);
        }
      });
  }

  doSearchFilter() {
    this.filter.valueChanges.pipe(debounceTime(0)).subscribe((value) => {
      console.log('value: ', value);
      if (!value || value.trim() === '') {
        this.filterdUsers = [...this.users];
        return;
      }
      console.log(this.users);
      const lowerCaseTerm = value.toLowerCase();
      this.filterdUsers = this.users.filter((user) => {
        return (
          user.email.toLowerCase().includes(lowerCaseTerm) ||
          user.username.toLocaleLowerCase().includes(lowerCaseTerm) ||
          user.fullName.toLowerCase().includes(lowerCaseTerm) ||
          user.adminString.toLowerCase().includes(lowerCaseTerm)
        );
      });
    });
  }

  courseSubmit(form: NgForm) {
    this.http
      .put<Course>(
        `http://localhost:8080/api/courses/${this.courseId}`,
        this.course
      )
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          for (let obj in error.error) {
            alert(error.error[obj]);
          }
        }
      );
  }

  deleteCourse() {
    this.http
      .delete(`http://localhost:8080/api/courses/${this.courseId}`)
      .subscribe(
        () => {
          this.toastService.show('Xoá khoá học thành công');
          this.router.navigate(['']);
        },
        (error) => {
          this.toastService.show('Xoá khoá học không thành công', 'error');
        }
      );
  }

  openDeleteCourse() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.data = this.deleteCourseModal;
  }

  changeRole(userId: string) {
    this.http
      .put<Member>(
        `http://localhost:8080/api/members/role?courseId=${this.courseId}&userId=${userId}`,
        {}
      )
      .subscribe((res) => {
        console.log(res);
        // this.router.navigate([''], {relativeTo: this.route});
        window.location.reload();
      });
  }
}
