import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { BaseFormComponent } from './base-form.component';
import { Module } from '../../model/module.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-update-module-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)" autocomplete="off">
      <div class="mb-3">
        <label for="oldNamename" class="form-label">Tên học phần cũ</label>
        <input
          class="form-control"
          id="oldName"
          disabled
          [value]="currentModule.name"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Tên học phần mới</label>
        <input
          class="form-control"
          id="name"
          name="name"
          type="text"
          [(ngModel)]="model.name"
        />
      </div>
    </form>
  `,
  styles: ``,
})
export class UpdateModuleFormComponent
  extends BaseFormComponent
  implements OnInit
{
  override model = {
    name: '',
  };

  @Input() currentModule: Module;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override onSubmit(form: NgForm) {
    console.log(this.model);
    this.http
      .put<Module>(
        `http://localhost:8080/api/modules/${this.currentModule.id}`,
        this.model
      )
      .subscribe(
        (response) => {
          form.form.reset();
          // window.location.reload();
          window.location.reload();
          this.toastService.show('Sửa học phần thành công');
        },
        (error) => {
          for (let obj in error.error) {
            this.toastService.show(error.error[obj], 'error');
          }
        }
      );
  }
}
