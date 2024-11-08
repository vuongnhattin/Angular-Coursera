import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import {
  NgbAccordionModule,
  NgbCollapse,
  NgbDropdown,
  NgbDropdownModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { List } from '../model/list.model';
import { Material } from '../model/material.model';
import { Module } from '../model/module.model';
import { FormModalComponent } from './modal/form-modal.component';
import { Modal } from '../model/modal.model';
import { CreateModuleFormComponent } from './form/create-module-form.component';
import { ToastContainerComponent } from './toast-container.component';
import { UpdateModuleFormComponent } from './form/update-module-form.component';
import { ModuleSharedService } from '../service/module-shared.service';
import { DeleteModalSharedService } from '../service/delete-modal-shared.service';
import { DeleteModalComponent } from './modal/delete-modal.component';
import { ToastService } from '../service/toast.service';
import { Course } from '../model/course.model';
import { Member } from '../model/member.model';
import {environment} from "../../environment/environment";
// import { UpdateModuleFormComponent } from './form/update-module-form.component';

@Component({
  selector: 'app-course-home',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NgbCollapse,
    RouterLink,
    RouterLinkActive,
    NgbAccordionModule,
    ToastContainerComponent,
    NgbDropdownModule,
  ],
  template: `
    <app-sidebar>
      <!-- <div class="col text-center"> -->
      @if (course) {
      <div title>
        {{ course.name }}
      </div>
      }
      <!-- </div> -->

      <ul class="list-group list-group-flush">
        <a
          class="list-group-item list-group-item-action"
          [routerLink]="['introduction']"
          routerLinkActive="active"
          (click)="focusModule(false)"
          ><div class="h5">
            <i class="fa-solid fa-house"></i>&nbsp; Giới thiệu khoá học
          </div></a
        >
      </ul>

      <ul class="list-group list-group-flush">
        <div class="list-group-item list-group-item-action" (click)="(1)">
          <div class="row align-items-center p-0">
            <div class="h5">
              <i class="fa-solid fa-book"></i>&nbsp; Các học phần
            </div>
          </div>
          @if (isAdmin === true) {

          <div class="col text-center">
            <button
              class="btn btn-outline-dark p-1 mx-1"
              (click)="openAddModule()"
            >
              <i class="fa-solid fa-circle-plus"></i>
            </button>
            <div
              class="btn btn btn-outline-dark p-1 mx-1"
              (click)="openUpdateModule()"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div
              class="btn btn btn-outline-dark p-1 mx-1"
              (click)="openDeleteModule()"
            >
              <i class="fa-solid fa-circle-minus"></i>
            </div>
          </div>
          }
        </div>
        @for (module of modules; track $index) {
        <a
          class="list-group-item list-group-item-action text-center"
          [routerLink]="['module', module.id]"
          [routerLinkActive]="'active'"
          (click)="focusModule(true)"
        >
          {{ module.name }}
        </a>
        }
      </ul>
      <ul class="list-group list-group-flush">
        <a
          class="list-group-item list-group-item-action"
          [routerLink]="['community']"
          routerLinkActive="active"
          (click)="focusModule(false)"
          ><div class="h5">
            <i class="fa-solid fa-comments"></i>&nbsp; Thảo luận
          </div></a
        >
        @if (isAdmin === true) {
        <a
          class="list-group-item list-group-item-action"
          routerLink="admin"
          routerLinkActive="active"
          (click)="focusModule(false)"
        >
          <div class="h5">
            <i class="fa-solid fa-sliders"></i>&nbsp; Quản lý khoá học
          </div></a
        >
        }
      </ul>
<!--      <div class="col text-center mt-5">-->
<!--        <button class="btn btn-danger">Huỷ khoá học</button>-->
<!--      </div>-->
    </app-sidebar>
    <app-toast></app-toast>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CourseHomeComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  modalService = inject(NgbModal);
  modulSharedService = inject(ModuleSharedService);
  deleteModalSharedService = inject(DeleteModalSharedService);
  toastService = inject(ToastService);

  courseId: number;
  course: Course;

  currentModule: Module | undefined;

  modules: Module[];

  isAdmin: boolean;

  isModuleFocused: boolean = false;

  addModuleModal: Modal = {
    header: 'Thêm học phần',
    body: CreateModuleFormComponent,
    others: {},
  };

  updateModuleModal: Modal = {
    header: 'Sửa học phần',
    body: UpdateModuleFormComponent,
    others: {},
  };

  deleteModuleModal: Modal = {
    id: 'delete-module',
    header: 'Xoá học phần',
    body: 'Bạn có chắc chắn muốn xoá học phần: ',
    others: {},
  };

  focusModule(state: boolean): void {
   this.isModuleFocused = state;
  }

  ngOnInit(): void {
    this.courseId = Number(
      this.route.parent?.snapshot.paramMap.get('courseId')
    );

    this.http
      .get<Member>(`${environment.apiUrl}/api/me/members/${this.courseId}`)
      .subscribe((response) => {
        this.isAdmin = response.admin;
        console.log(response);
      });

    this.http
      .get<Course>(`${environment.apiUrl}/api/courses/${this.courseId}`)
      .subscribe((response) => {
        this.course = response;
      });

    this.addModuleModal.others = { courseId: this.courseId };

    this.http
      .get<List<Module>>(
        `${environment.apiUrl}/api/courses/${this.courseId}/modules`
      )
      .subscribe((response) => {
        this.modules = response.data;
      });

    this.modulSharedService.currentData.subscribe((data) => {
      if (!data) {
        return;
      }

      this.http
        .get<Module>(`${environment.apiUrl}/api/modules/${data}`)
        .subscribe((response) => {
          this.currentModule = response;
        });
    });

    this.deleteModalSharedService.data$.subscribe((data) => {
      if (data === 'delete-module') {
        if (!this.currentModule) {
          this.toastService.show('Vui lòng chọn học phần');
          return;
        }

        this.http
          .delete(`${environment.apiUrl}/api/modules/${this.currentModule.id}`)
          .subscribe(
            () => {
              this.toastService.show('Xoá học phần thành công');

              this.router.navigate([
                'course',
                this.courseId,
                'home',
                'module',
                this.modules[0].id,
              ]);

              window.location.reload();
            },
            (error) => {
              this.toastService.show('Xoá học phần không thành công', 'error');
            }
          );
      }
    });
  }

  openAddModule() {
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.data = this.addModuleModal;
  }

  openUpdateModule() {
    if (!this.isModuleFocused) {
      alert('Vui lòng chọn học phần');
      return;
    }
    this.updateModuleModal.others = {
      currentModule: this.currentModule,
    };
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.data = this.updateModuleModal;
  }

  openDeleteModule() {
    if (!this.isModuleFocused) {
      alert('Vui lòng chọn học phần');
      return;
    }
    const modalRef = this.modalService.open(DeleteModalComponent);
    this.deleteModuleModal.body = `Bạn có chắc chắn muốn xoá học phần: ${this.currentModule?.name} không?`;
    modalRef.componentInstance.data = this.deleteModuleModal;
  }
}
