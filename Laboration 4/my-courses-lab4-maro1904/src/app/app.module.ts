import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderByPipe } from './filter.pipe';


import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MyCourseDetailComponent } from './my-course-detail/my-course-detail.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { AdminComponent } from './admin/admin.component';
import { CourseFilterComponent } from './course-filter/course-filter.component';
import { CourseListComponent } from './course-list/course-list.component';
import { MyCourseListComponent } from './my-course-list/my-course-list.component';
import { MyCourseAddFormComponent } from './my-course-add-form/my-course-add-form.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CoursesComponent,
    MyCoursesComponent,
    CourseDetailComponent,
    MyCourseDetailComponent,
    SubjectDetailComponent,
    AdminComponent,
    CourseFilterComponent,
    CourseListComponent,
    MyCourseListComponent,
    MyCourseAddFormComponent,
    OrderByPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
