import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { List } from '../model/list.model';
import { Material } from '../model/material.model';
import { BreadcrumbComponent } from './breadcrumb.component';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleSharedService } from '../service/module-shared.service';
import { Modal } from '../model/modal.model';
import { CreateMaterialFormComponent } from './form/create-material-form.component';
import { FormModalComponent } from './modal/form-modal.component';
import { DeleteModalComponent } from './modal/delete-modal.component';
import { DeleteModalSharedService } from '../service/delete-modal-shared.service';
import { ToastService } from '../service/toast.service';
import { UpdateMaterialFormComponent } from './form/update-material-form.component';
import { Member } from '../model/member.model';
import {environment} from "../environment/environment";

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, NgbDropdownModule],
  template: `
    <app-breadcrumb
      [data]="[
        { name: 'Trang chủ', url: '/' },
        { name: 'Khoá học', url: '' }
      ]"
    ></app-breadcrumb>
    <div style="height: 500px">
      <div class="card">
        <div class="row align-items-center">
          <div class="col-auto">
            <div class="h4 card-header p-3 ">Tài liệu học tập</div>
          </div>
          @if (isAdmin) {
            <div class="col text-end px-4">
              <div class="btn btn-primary" (click)="openAddMaterial()">
                Thêm tài liệu
              </div>
            </div>
          }
        </div>
        <div class="list-group list-group-flush">
          @for (material of materials; track $index) {
          <div class="list-group-item list-group-item-action">
            <div class="row align-items-center">
              <div class="col-11">
                <a [routerLink]="['../../../material', material.id]" class="">
                  @if (material.fileType === 'video') {
                  <i class="fa-solid fa-circle-play"></i>&nbsp; } @if
                  (material.fileType === 'pdf') {
                  <i class="fa-solid fa-file-pdf"></i>&nbsp; }
                  {{ material.name }}
                </a>
              </div>
              @if (isAdmin) {
                <div class="col-1 text-end">
                  <div ngbDropdown>
                    <div ngbDropdownToggle class="btn">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>

                    <div ngbDropdownMenu class="my-dropdown-toggle">
                      <button
                        ngbDropdownItem
                        (click)="openUpdateMaterial(material.id)"
                      >
                        Sửa
                      </button>
                      <button
                        ngbDropdownItem
                        (click)="openDeleteMaterial(material.id)"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ModuleDetailComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  moduleSharedService = inject(ModuleSharedService);
  modalService = inject(NgbModal);
  deleteModalSharedService = inject(DeleteModalSharedService);
  toastService = inject(ToastService);

  currentMaterialId: number;

  materials: Material[];

  isAdmin: boolean;

  createMaterialModal: Modal = {
    header: 'Thêm tài liệu',
    body: CreateMaterialFormComponent,
  };

  deleteMaterialModal: Modal = {
    id: 'delete-material',
    header: 'Xoá tài liệu',
    body: 'Bạn có chắc chắn muốn xoá tài liệu này không?',
  };

  updateMaterialModal: Modal = {
    header: 'Sửa tài liệu',
    body: UpdateMaterialFormComponent,
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const moduleId = params['moduleId'];

      this.moduleSharedService.updateData(moduleId);

      this.createMaterialModal.others = { moduleId: moduleId };

      this.http
        .get<List<Material>>(
          `${environment.apiUrl}/api/modules/${moduleId}/materials`
        )
        .subscribe((response) => {
          this.materials = response.data;
        });
    });

    this.deleteModalSharedService.data$.subscribe((data) => {
      if (data === 'delete-material') {
        this.http
          .delete(
            `${environment.apiUrl}/api/materials/${this.currentMaterialId}`
          )
          .subscribe((response) => {
            this.toastService.show('Xoá tài liệu thành công');
            // this.router.navigate(['./'], { relativeTo: this.route });
            window.location.reload();
          });
      }
    });

    const courseId =
      this.route.parent?.parent?.snapshot.paramMap.get('courseId');
    this.http
      .get<Member>(`${environment.apiUrl}/api/me/members/${courseId}`)
      .subscribe((response) => {
        this.isAdmin = response.admin;
      });
  }

  openAddMaterial() {
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.data = this.createMaterialModal;
  }

  openDeleteMaterial(materialId: number) {
    this.currentMaterialId = materialId;
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.data = this.deleteMaterialModal;
  }

  openUpdateMaterial(materialId: number) {
    this.updateMaterialModal.others = { materialId: materialId };
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.data = this.updateMaterialModal;
  }
}
