import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteModalSharedService {

  private dataSource = new Subject<void>();
  data$ = this.dataSource.asObservable();

  constructor() {}

  triggerDelete() {
    this.dataSource.next();
  }
}
