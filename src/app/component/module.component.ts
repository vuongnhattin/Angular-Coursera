import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, SidebarComponent, NgbCollapseModule],
  template: `
    
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CourseMaterialComponent {
}
