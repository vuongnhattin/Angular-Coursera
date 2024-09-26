import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteModalSharedService {

  private dataSource = new Subject<string>();
  data$ = this.dataSource.asObservable();

  constructor() {}

  triggerDelete(value: string | undefined) {
    if (!value) {
      this.dataSource.next('');
    }
    else {
      this.dataSource.next(value);
    }
  }
}
