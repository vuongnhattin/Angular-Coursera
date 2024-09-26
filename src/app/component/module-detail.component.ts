import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { List } from '../model/list.model';
import { Material } from '../model/material.model';
import { BreadcrumbComponent } from './breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleSharedService } from '../service/module-shared.service';

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
    <div  style="height: 500px">

      <div class="card">
        <div class="row align-items-center">
          <div class="col-auto">
            <div class="h4 card-header p-3 ">Tài liệu học tập</div>
          </div>
          <div class="col text-end px-4">
            <div class="btn btn-primary">Thêm tài liệu</div>
          </div>
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
              <div class="col-1 text-end">
                <div ngbDropdown >
                  <div ngbDropdownToggle class="btn">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                  <div ngbDropdownMenu class="my-dropdown-toggle">
                    <button ngbDropdownItem>Sửa</button>
                    <button ngbDropdownItem>Xoá</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ModuleDetailComponent {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  moduleSharedService = inject(ModuleSharedService);

  materials: Material[];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const moduleId = params['moduleId'];
      
      this.moduleSharedService.updateData(moduleId);

      this.http
        .get<List<Material>>(
          `http://localhost:8080/api/modules/${moduleId}/materials`
        )
        .subscribe((response) => {
          this.materials = response.data;
        });
    });
  }
}
