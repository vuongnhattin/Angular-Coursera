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
      <div title class="text-danger">{{course.name}}</div>

      <ul class="list-group list-group-flush">
        <a
          class="list-group-item list-group-item-action"
          [routerLink]="['introduction']"
          routerLinkActive="active"
          ><div class="h5">Giới thiệu khoá học</div></a
        >
      </ul>

      <ul class="list-group list-group-flush">
        <div class="list-group-item list-group-item-action" (click)="(1)">
          <div class="row align-items-center p-0">
            <div class="h5 col-7">Các học phần</div>
            <div class="col text-end">
              <button
                class="btn btn-outline-dark p-1"
                (click)="openAddModule()"
              >
                <i class="fa-solid fa-circle-plus"></i>
              </button>
              <div
                class="btn btn btn-outline-dark p-1"
                (click)="openUpdateModule()"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <div
                class="btn btn btn-outline-dark p-1"
                (click)="openDeleteModule()"
              >
                <i class="fa-solid fa-circle-minus"></i>
              </div>
            </div>
          </div>
        </div>
        @for (module of modules; track $index) {
        <a
          class="list-group-item list-group-item-action text-center"
          [routerLink]="['module', module.id]"
          [routerLinkActive]="'active'"
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
          ><div class="h5">Thảo luận</div></a
        >
        <a
          class="list-group-item list-group-item-action"
          routerLink="admin"
          routerLinkActive="active"
        >
          <div class="h5">Quản lý người dùng</div></a
        >
      </ul>
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

  ngOnInit(): void {
    this.courseId = Number(
      this.route.parent?.snapshot.paramMap.get('courseId')
    );

    this.http.get<Course>(`http://localhost:8080/api/courses/${this.courseId}`).subscribe((response) => {
      this.course = response;
    });

    this.addModuleModal.others = { courseId: this.courseId };

    this.http
      .get<List<Module>>(
        `http://localhost:8080/api/courses/${this.courseId}/modules`
      )
      .subscribe((response) => {
        this.modules = response.data;
      });

    this.modulSharedService.currentData.subscribe((data) => {
      if (!data) {
        return;
      }

      this.http
        .get<Module>(`http://localhost:8080/api/modules/${data}`)
        .subscribe((response) => {
          this.currentModule = response;
        });
    });

    this.deleteModalSharedService.data$.subscribe((data) => {
      if (data === 'delete-module') {
        if (!this.currentModule) {
          this.toastService.show('Bạn chưa chọn học phần');
          return;
        }

        this.http
          .delete(`http://localhost:8080/api/modules/${this.currentModule.id}`)
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
    this.updateModuleModal.others = {
      currentModule: this.currentModule,
    };
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.data = this.updateModuleModal;
  }

  openDeleteModule() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    this.deleteModuleModal.body = `Bạn có chắc chắn muốn xoá học phần: ${this.currentModule?.name} không?`;
    modalRef.componentInstance.data = this.deleteModuleModal;
  }
}
