import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  template: `
    <div
      class="offcanvas offcanvas-start show"
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
      style="top: 4.5rem; overflow-y: auto; width: 300px;"
    >
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="offcanvasLabel">
          <ng-content select="[title]"></ng-content>
        </h3>
      </div>
      <div class="offcanvas-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: ``
})
export class SidebarComponent {

}
