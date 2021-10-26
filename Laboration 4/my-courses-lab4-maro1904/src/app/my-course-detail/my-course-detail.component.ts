import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { mycourses } from '../types/course.type';

@Component({
  selector: 'app-my-course-detail',
  templateUrl: './my-course-detail.component.html',
  styleUrls: ['./my-course-detail.component.css']
})
export class MyCourseDetailComponent implements OnInit {
  mycoursedetail: mycourses = {} as mycourses;
  results: mycourses[] = [];
  errorMessage: string = "";

  constructor(private backendService : BackendService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.params.courseCode;
    console.log(code);
    this.backendService.getDetailMyCourses(code).subscribe
    if (code) {
      this.backendService.getDetailMyCourses(code).subscribe({
        next: profiles => {
          this.results = profiles;
          this.mycoursedetail = this.results[0];
        },
        error: err => {
          this.errorMessage = err;
          console.error(this.errorMessage);
        }
      });
  }

}

}
