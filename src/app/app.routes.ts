import {Routes} from '@angular/router';
import {ListCoursePageComponent} from './component/list-course.component';
import {ErrorPageComponent} from './component/error-page.component';
import {ProfilePageComponent} from './component/profile-page.component';
import {CoursePageComponent} from './component/course-page.component';
import {ModuleDetailComponent} from './component/module-detail.component';
import {CourseHomeComponent} from './component/course-home.component';
import {CourseAdminComponent} from './component/course-admin.component';
import {MaterialComponent} from './component/material.component';
import {MaterialDetailComponent} from './component/material-detail.component';
import {CommunityComponent} from './component/community.component';
import {CourseIntroductionComponent} from './component/course-introduction.component';
import {LoginComponent} from "./component/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {RegisterComponent} from "./component/register.component";

export const routes: Routes = [
  // {path: 'courses', component: ListCoursePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: ListCoursePageComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {
    path: 'course/:courseId',
    component: CoursePageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: CourseHomeComponent, canActivate: [AuthGuard],
        children: [
          {path: 'introduction', component: CourseIntroductionComponent, canActivate: [AuthGuard],},
          {path: 'module/:moduleId', component: ModuleDetailComponent, canActivate: [AuthGuard],},
          {path: 'admin', component: CourseAdminComponent, canActivate: [AuthGuard],},
          {path: 'community', component: CommunityComponent, canActivate: [AuthGuard],},
          {path: '', redirectTo: 'introduction', pathMatch: 'full'},
        ],
      },
      {
        path: 'material',
        component: MaterialComponent, canActivate: [AuthGuard],
        children: [{path: ':materialId', component: MaterialDetailComponent, canActivate: [AuthGuard],}],
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ],
  },
  {path: 'error', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent},
];
