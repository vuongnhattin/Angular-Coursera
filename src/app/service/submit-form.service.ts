import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmitFormService {
  private submitFormSource = new Subject<void>();
  submitForm$ = this.submitFormSource.asObservable();

  constructor() {}

  triggerFormSubmit() {
    this.submitFormSource.next();
  }
}
