import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ol class="breadcrumb">
      @for (item of data(); track $index) {
        @if ($index === data().length - 1) {
          <li class="breadcrumb-item active">{{ item.name }}</li>
        }
        @else {
          <li class="breadcrumb-item">
            <a [routerLink]="item.url">{{ item.name }}</a>
          </li>
        }
      }
    </ol>
  `,
  styles: ``
})
export class BreadcrumbComponent {
  data = input.required<{
    name: string;
    url: string;
  }[]>();
}
