import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { course } from '../types/course.type';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  coursedetail: course = {} as course;
  results: course[] = [];
  errorMessage: string = "";
  user_id: string;
  test : string;
  constructor(private backendService : BackendService, private activatedRoute: ActivatedRoute) { }
    ngOnInit(): void {
      let code = this.activatedRoute.snapshot.params.courseCode;
      this.test = code;
      console.log(code);
      this.backendService.getDetailCourses(code).subscribe
      if (code) {
        this.backendService.getDetailCourses(code).subscribe({
          next: profiles => {
            this.results = profiles;
            this.coursedetail = this.results[0];
          },
          error: err => {
            this.errorMessage = err;
            console.error(this.errorMessage);
          }
        });
    }

}
}
