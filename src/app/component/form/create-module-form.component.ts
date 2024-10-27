import { Component, inject, Input, OnInit } from '@angular/core';
import { BaseFormComponent } from './base-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Module } from '../../model/module.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-create-module-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form  #form="ngForm" (ngSubmit)="onSubmit(form)" autocomplete="off">
      <div class="mb-3">
        <label for="name" class="form-label">Tên học phần</label>
        <input
          class="form-control"
          id="name"
          name="name"
          [(ngModel)]="model.name"
        />
      </div>
    </form>
  `,
  styles: ``
})
export class CreateModuleFormComponent extends BaseFormComponent implements OnInit {
  override model = {
    name: '',
    courseId: 1,
  }

  @Input() courseId: number;

  override onSubmit(form: NgForm) {
    this.http.post<Module>(`${environment.apiUrl}/api/modules`, this.model).subscribe(
      (response) => {
        form.form.reset();
        this.toastService.show('Tạo học phần thành công');
        window.location.reload();
      },
      (error) => {
        for (let obj in error.error) {
          this.toastService.show(error.error[obj], 'error');
        }
      }
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.model.courseId = this.courseId;
  }
}
