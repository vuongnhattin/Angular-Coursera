import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="container">
      <pre>
        {{ userInfo | json }}
      </pre>
    </div>
  `,
  styles: ``
})
export class ProfilePageComponent implements OnInit {
  oauthService = inject(OAuthService);
  userInfo: any;

  ngOnInit(): void {
    this.userInfo = this.oauthService.getIdentityClaims();
    console.log(this.userInfo);
  }
}
