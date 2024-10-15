import { Routes } from '@angular/router';
import { ListCoursePageComponent } from './component/list-course.component';
import { ErrorPageComponent } from './component/error-page.component';
import { ProfilePageComponent } from './component/profile-page.component';
import { CoursePageComponent } from './component/course-page.component';
import { ModuleDetailComponent } from './component/module-detail.component';
import { CourseHomeComponent } from './component/course-home.component';
import { CourseAdminComponent } from './component/course-admin.component';
import { MaterialComponent } from './component/material.component';
import { MaterialDetailComponent } from './component/material-detail.component';
import { CommunityComponent } from './component/community.component';
import { CourseIntroductionComponent } from './component/course-introduction.component';

export const routes: Routes = [
  // {path: 'courses', component: ListCoursePageComponent},
  { path: '', component: ListCoursePageComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent },
  {
    path: 'course/:courseId',
    component: CoursePageComponent,
    children: [
      {
        path: 'home',
        component: CourseHomeComponent,
        children: [
          { path: 'introduction', component: CourseIntroductionComponent },
          { path: 'module/:moduleId', component: ModuleDetailComponent },
          { path: 'admin', component: CourseAdminComponent },
          { path: 'community', component: CommunityComponent },
          { path: '', redirectTo: 'introduction', pathMatch: 'full' },
        ],
      },
      {
        path: 'material',
        component: MaterialComponent,
        children: [{ path: ':materialId', component: MaterialDetailComponent }],
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];
