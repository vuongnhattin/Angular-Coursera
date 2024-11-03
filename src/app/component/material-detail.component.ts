import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Material } from '../model/material.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SafePipe } from '../pipe/safe.pipe';
import { BreadcrumbComponent } from './breadcrumb.component';
import { FileResponse } from '../model/file-response.model';
import { Member } from '../model/member.model';
import {environment} from "../../environment/environment";

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe, SafePipe, BreadcrumbComponent],
  template: `
    <app-breadcrumb
      [data]="[
        { name: 'Trang chủ', url: '/' },
        { name: 'Khoá học', url: '../../home/introduction' },
        { name: 'Tài liệu', url: '' }
      ]"
    >
    </app-breadcrumb>
    @if (material && fileUrl) { @if (material.fileType === 'video') {
    <video width="800" controls>
      <source src="{{ fileUrl }}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    } @else if (material.fileType === 'pdf') {
    <iframe class="pdf" [src]="fileUrl | safe" width="800" height="600">
    </iframe>
    } }
  `,
  styles: ``,
})
export class MaterialDetailComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);

  fileUrl: string;

  material: Material;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const materialId = params['materialId'];
      this.http
        .get<Material>(`${environment.apiUrl}/api/materials/${materialId}`)
        .pipe(
          switchMap((material) => {
            this.material = material;
            const fileUrl = material.fileUrl;
            return this.http.get<FileResponse>(
              `${environment.apiUrl}/api/file?objectKey=${fileUrl}`
            );
          })
        )
        .subscribe((res) => {
          this.fileUrl = res.fileUrl;
        });
    });
  }
}
