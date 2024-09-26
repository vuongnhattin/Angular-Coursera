import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Material } from '../model/material.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SafePipe } from '../pipe/safe.pipe';
import { BreadcrumbComponent } from "./breadcrumb.component";

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe, SafePipe, BreadcrumbComponent],
  template: `
    <app-breadcrumb [data]="[
      { name: 'Trang chủ', url: '/' },
      { name: 'Khoá học', url: '../../home/module/1' },
      { name: 'Tài liệu', url: '' }
    ]">
    </app-breadcrumb>

    @if (material) {
      @if (material.fileType === 'video') {
        <video width="800" controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      }
      @else if (material.fileType === 'pdf') {
        <iframe
          class="pdf"
          [src]="material.fileUrl | safe"
          width="800"
          height="600"
        >
        </iframe>
      }

    }
  `,
  styles: ``,
})
export class MaterialDetailComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);

  material: Material;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const materialId = params['materialId'];
      this.http
        .get<Material>(
          `http://localhost:8080/api/materials/${materialId}`
        ).subscribe(res => {
          this.material = res;
        })
      });
  }
}
