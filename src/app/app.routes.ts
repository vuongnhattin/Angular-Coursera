import { Routes } from '@angular/router';
import { ListCoursePageComponent } from './component/list-course.component';
import { ErrorPageComponent } from './component/error-page.component';
import { ProfilePageComponent } from './component/profile-page.component';
import { CoursePageComponent } from './component/course-page.component';

export const routes: Routes = [
    // {path: 'courses', component: ListCoursePageComponent},
    {path: '', component: ListCoursePageComponent, pathMatch: 'full'},
    {path: 'profile', component: ProfilePageComponent},
    {path: 'courses/:id', component: CoursePageComponent},
    {path : 'error', component: ErrorPageComponent},
    {path: '**', redirectTo: '/error'}
];
