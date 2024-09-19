import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './component/header.component';
import { AuthService } from './service/auth.service';
import { ToastService } from './service/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNavModule, HeaderComponent, NgbToastModule],
  template: `
    <app-header></app-header>
    
    

    <router-outlet />
  `,
  styles: [],
  
})
export class AppComponent {
  title = 'angular-coursera';
}
