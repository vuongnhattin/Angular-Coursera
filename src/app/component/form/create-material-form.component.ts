import { Component, Input } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { BaseFormComponent } from './base-form.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-material-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
    <form
      #form="ngForm"
      (ngSubmit)="onSubmit(form)"
      autocomplete="off"
      enctype="multipart/form-data"
    >
      <div class="mb-3">
        <label for="name" class="form-label">Tên tài liệu</label>
        <input
          class="form-control"
          id="name"
          name="name"
          [(ngModel)]="model.name"
        />
      </div>

      <div class="mb-3">
        <label for="file" class="form-label">Tài liệu</label>
        <input
          class="form-control"
          id="file"
          name="file"
          type="file"
          (change)="onFileSelected($event)"
          [(ngModel)]="model.file"
        />
      </div>

      <div class="mb-3">
        <label for="fileType" class="form-label">Tài liệu</label>
        <select
          class="form-select"
          id="fileType"
          name="fileType"
          [(ngModel)]="model.fileType"
        >
          <option *ngFor="let type of types" [value]="type">{{
            type
          }}</option>
        </select>
      </div>
    </form>
  `,
  styles: ``,
})
export class CreateMaterialFormComponent extends BaseFormComponent {
  @Input() moduleId: number;

  override onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('file', this.file as Blob);
    formData.append('fileType', this.model.fileType);
    formData.append('moduleId', this.moduleId.toString());

    this.http.post(`http://localhost:8080/api/materials`, formData).subscribe(() => {
      this.toastService.show('Thêm tài liệu mới thành công');
      window.location.reload();
    });
  }

  override model = {
    name: '',
    file: null,
    fileType: '',
  };

  types = ['video', 'pdf'];

  file: File | null = null;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
