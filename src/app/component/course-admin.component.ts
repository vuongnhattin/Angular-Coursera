import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-admin',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" enctype="multipart/form-data">
      <input type="text" name=" " [(ngModel)]="name">
      <input type="file" class="form-control" (change)="onFileSelectd($event)">
      <button class="btn btn-outline-primary">Thêm tài liệu</button>
    </form>
  `,
  styles: ``
})
export class CourseAdminComponent {
  name: string;

  file: File | null = null;

  http = inject(HttpClient);

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('file', this.file as Blob);

    this.http.post("http://localhost:8080/api/modules/2/materials", formData)
    .subscribe(response => {
      console.log(response);
    })
  }

  onFileSelectd(event: any) {
    this.file = event.target.files[0];
  }
}


