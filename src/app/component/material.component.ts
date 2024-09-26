import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { List } from '../model/list.model';
import { Material } from '../model/material.model';
import { ModuleDetail } from '../model/module-detail.model';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [SidebarComponent, RouterLink, RouterLinkActive, RouterOutlet, NgbCollapseModule],
  template: `
    <app-sidebar>
      <div title>Danh sách tài liệu</div>
      <ul class="list-group list-group-flush">
        @for (module of modules; track $index) {
          <button
            class="list-group-item list-group-item-action"
            (click)="isCollapsed[$index] = !isCollapsed[$index]"
            ><div class="h5"><i class="fa-solid fa-angle-down"></i>&nbsp; {{module.name}}</div></button
          >
          <div [(ngbCollapse)]="isCollapsed[$index]" class="list-group list-group-flush">
            @for (material of module.materials; track $index) {
            <button
              class="list-group-item list-group-item-action text-center"
              [routerLink]="['../material', material.id]"
              [routerLinkActive]="'active'"
            >
              {{ material.name }}
            </button>
            }

          </div>
        }
      </ul>
    </app-sidebar>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class MaterialComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);

  moduleId: number;

  modules: ModuleDetail[];

  isCollapsed: boolean[];

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      const courseId = params['courseId'];
      this.http
        .get<List<ModuleDetail>>(
          `http://localhost:8080/api/courses/${courseId}/modules-detail`
        )
        .subscribe((response) => {
          this.modules = response.data;
          this.isCollapsed = new Array(this.modules.length).fill(false);
        });
    });
  }
}
