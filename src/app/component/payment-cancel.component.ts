import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="text-center">
        <div class="h2 mb-4">
          Thanh toán đã bị huỷ
        </div>
        <a class="btn btn-primary" href="">Quay về trang chủ</a>
      </div>
    </div>
  `,
  styles: ``
})
export class PaymentCancelComponent {

}
