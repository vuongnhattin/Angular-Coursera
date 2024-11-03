import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { environment } from '../../environment/environment';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-payment-review',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="text-center">
        <div class="h2 mb-4">
          {{ paymentMessage }}
        </div>
        <div>
          @if (loading) {
            <div class="spinner-grow text-primary mb-3" role="status">
            </div>
          }
        </div>

        <a class="btn btn-primary" href="">Quay về trang chủ</a>
      </div>
    </div>
  `,
  styles: ``
})
export class PaymentReviewComponent implements OnInit {
  http = inject(HttpClient)
  route = inject(ActivatedRoute);

  paymentMessage = 'Đang xử lý...';
  loading = true;

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];

    this.http.post(`${environment.apiUrl}/api/paypal/capture?token=${token}`, {}).subscribe(
      res => {
        this.paymentMessage = 'Thanh toán thành công';
        this.loading = false;
      },
      err => {
        this.paymentMessage = 'Đã có lỗi xảy ra';
        this.loading = false;
      }
    );
  }
}
