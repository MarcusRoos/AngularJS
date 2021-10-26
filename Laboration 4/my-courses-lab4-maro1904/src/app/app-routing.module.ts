import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { AdminComponent } from './admin/admin.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MyCourseDetailComponent } from './my-course-detail/my-course-detail.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';

import { CourseFilterComponent } from './course-filter/course-filter.component';
import { MyCourseAddFormComponent } from './my-course-add-form/my-course-add-form.component';


const routes: Routes = [
  { path: '', component: CoursesComponent, pathMatch: 'full'},
  { path: 'courses', component: CoursesComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'my-courses/:courseCode', component: MyCourseDetailComponent },
  { path: 'courses/:courseCode', component: CourseDetailComponent },
  { path: 'subjects/:subjectCode', component: SubjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
