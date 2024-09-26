import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Course } from '../../model/course.model';
import { SubmitFormService } from '../../service/submit-form.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [FormsModule],
  template: `
  `,
  styles: ``
})
export class BaseFormComponent {
  submitFormService = inject(SubmitFormService);
  private subscription!: Subscription;
  toastService = inject(ToastService);
  http = inject(HttpClient);

  model: any;

  @ViewChild('form') form!: NgForm;

  ngOnInit(): void {
    this.subscription = this.submitFormService.submitForm$.subscribe(() => {
      this.onSubmit(this.form);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {}
}
