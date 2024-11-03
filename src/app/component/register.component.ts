import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {LoginRequest} from "../model/login-request.model";
import {LoginResponse} from "../model/login-response.model";
import {RegisterRequest} from "../model/register-request.mode";
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `

    <body class="d-flex align-items-center py-4 ">
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      <symbol id="check2" viewBox="0 0 16 16">
        <path
          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </symbol>
      <symbol id="circle-half" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
      </symbol>
      <symbol id="moon-stars-fill" viewBox="0 0 16 16">
        <path
          d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
        <path
          d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
      </symbol>
      <symbol id="sun-fill" viewBox="0 0 16 16">
        <path
          d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </symbol>
    </svg>

    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
      <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
              id="bd-theme"
              type="button"
              aria-expanded="false"
              data-bs-toggle="dropdown"
              aria-label="Toggle theme (auto)">
        <svg class="bi my-1 theme-icon-active" width="1em" height="1em">
          <use href="#circle-half"></use>
        </svg>
        <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
        <li>
          <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light"
                  aria-pressed="false">
            <svg class="bi me-2 opacity-50" width="1em" height="1em">
              <use href="#sun-fill"></use>
            </svg>
            Light
            <svg class="bi ms-auto d-none" width="1em" height="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
        <li>
          <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
                  aria-pressed="false">
            <svg class="bi me-2 opacity-50" width="1em" height="1em">
              <use href="#moon-stars-fill"></use>
            </svg>
            Dark
            <svg class="bi ms-auto d-none" width="1em" height="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
        <li>
          <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto"
                  aria-pressed="true">
            <svg class="bi me-2 opacity-50" width="1em" height="1em">
              <use href="#circle-half"></use>
            </svg>
            Auto
            <svg class="bi ms-auto d-none" width="1em" height="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>



    <main class="form-signin w-100 m-auto" style="">
      <div class="mb-3">
      <a class="btn-link" routerLink="/login">← Quay lại đăng nhập</a>

      </div>
      <form #form="ngForm" (ngSubmit)="onSubmit()">
        <!--        <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
        <h1 class="h3 mb-3 fw-normal col text-center">Nhập thông tin đăng kí</h1>

        <div class="mb-2 text-danger" style="height: 20px">{{ error }}</div>


        <div class="form-floating">
          <input [(ngModel)]="model.username" type="text" class="form-control" id="floatingInput"
                 placeholder="username" name="username">
          <label for="floatingInput">Tên đăng nhập</label>
        </div>

        <div class="form-floating mt-3">
          <input [(ngModel)]="model.email" type="text" class="form-control" id="email"
                 placeholder="email" name="email">
          <label for="email">Email</label>
        </div>

        <div class="input-group">
          <div class="form-floating mt-3">
            <input [(ngModel)]="model.password" type="password" class="form-control" id="floatingPassword"
                   placeholder="password" name="password">
            <label for="floatingPassword">Mật khẩu</label>
          </div>
          <div class="form-floating mt-3">
            <input [(ngModel)]="model.repassword" type="password" class="form-control" id="repassword"
                   placeholder="password" name="repassword">
            <label for="repassword">Nhập lại mật khẩu</label>
          </div>
        </div>

        <div class="input-group">
          <div class="form-floating mt-3">
            <input [(ngModel)]="model.firstName" type="text" class="form-control" id="firstName"
                   placeholder="password" name="firstName">
            <label for="firstName">Họ</label>
          </div>
          <div class="form-floating mt-3">
            <input [(ngModel)]="model.lastName" type="text" class="form-control" id="lastName"
                   placeholder="password" name="lastName">
            <label for="lastName">Tên</label>
          </div>
        </div>


        <!--        <div class="form-check text-start my-3">-->
        <!--          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">-->
        <!--          <label class="form-check-label" for="flexCheckDefault">-->
        <!--            Remember me-->
        <!--          </label>-->
        <!--        </div>-->
        <button class="btn btn-primary w-100 py-2 mt-3" [disabled]="loading" type="submit">Đăng kí</button>
        <!--        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>-->
      </form>
    </main>
    <script src="../../assets/dist/js/bootstrap.bundle.min.js"></script>

    </body>

  `,
  styles: `
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }

    .b-example-divider {
      width: 100%;
      height: 3rem;
      background-color: rgba(0, 0, 0, .1);
      border: solid rgba(0, 0, 0, .15);
      border-width: 1px 0;
      box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
      flex-shrink: 0;
      width: 1.5rem;
      height: 100vh;
    }

    .bi {
      vertical-align: -.125em;
      fill: currentColor;
    }

    .nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;
    }

    .nav-scroller .nav {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 1rem;
      margin-top: -1px;
      overflow-x: auto;
      text-align: center;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }

    .btn-bd-primary {
      --bd-violet-bg: #712cf9;
      --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

      --bs-btn-font-weight: 600;
      --bs-btn-color: var(--bs-white);
      --bs-btn-bg: var(--bd-violet-bg);
      --bs-btn-border-color: var(--bd-violet-bg);
      --bs-btn-hover-color: var(--bs-white);
      --bs-btn-hover-bg: #6528e0;
      --bs-btn-hover-border-color: #6528e0;
      --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
      --bs-btn-active-color: var(--bs-btn-hover-color);
      --bs-btn-active-bg: #5a23c8;
      --bs-btn-active-border-color: #5a23c8;
    }

    .bd-mode-toggle {
      z-index: 1500;
    }

    .bd-mode-toggle .dropdown-menu .active .bi {
      display: block !important;
    }

    html,
    body {
      height: 100%;
    }

    .form-signin {
      max-width: 500px;
      padding: 1rem;
    }

    .form-signin .form-floating:focus-within {
      z-index: 2;
    }

    .form-signin input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

  `
})
export class RegisterComponent implements OnInit{
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);
  error = '  '

  loading = false;

  model: RegisterRequest = {
    username: '',
    password: '',
    repassword: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  ngOnInit(): void {
    if (this.auth.isAuth()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.model.password !== this.model.repassword) {
      this.error = "Mật khẩu không khớp"
      this.loading = false;
      return;
    }
    console.log(this.model)
    this.http.post<LoginResponse>(`${environment.apiUrl}/auth/register`, this.model, {
      headers: new HttpHeaders({
        'skipAuth': 'true'
      })
    }).subscribe(
      (res) => {
        // this.auth.setAccessToken(res.token);
        alert("Đăng ký thành công")
        // window.location.reload()
        this.router.navigate(['/login']);
      },
      error => {
        this.loading = false;
        console.log(error.error.message);
        for (let obj in error.error) {
          this.error = error.error[obj];
          return;
        }
      }
    )
  }
}
