import { Component, inject, Input } from '@angular/core';
import { Modal } from '../../model/modal.model';
import { BaseModalComponent } from './base-modal.component';
import { DeleteModalSharedService } from '../../service/delete-modal-shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [BaseModalComponent],
  template: `
    <app-base-modal (agree)="onAgree()" [data]="data" [buttonType]="'btn-danger'">
      {{ data.body }}
    </app-base-modal>
  `,
  styles: ``,
})
export class DeleteModalComponent {
  @Input() data: Modal;
  service = inject(DeleteModalSharedService);
  activeModal = inject(NgbActiveModal);

  onAgree() {
    this.service.triggerDelete(this.data.id);
    this.activeModal.close();
  }
}
