import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { mycourses } from '../types/course.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  mycoursedetail: mycourses = {} as mycourses;
  results: mycourses[] = [];
  errorMessage: string = "";
  user_id: string;
  constructor(private backendService : BackendService) { }
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    let obs = this.backendService.getMyCourses();
    obs.subscribe((data) => {
      this.results = data;

    });
  }

  async delCourse(courseCode: String){
    this.backendService.deleteMyCourse(courseCode).subscribe
    if (courseCode) {
      this.backendService.deleteMyCourse(courseCode).subscribe({
        error: err => {
          this.errorMessage = err;
          console.error(this.errorMessage);
        }
      });
  }
  await this.sleep(350);
  this.getCourses();
  }

  async updateCourse(courseCode: String){
    this.backendService.updateMyCourse(courseCode).subscribe
    if (courseCode) {
      this.backendService.updateMyCourse(courseCode).subscribe({
        error: err => {
          this.errorMessage = err;
          console.error(this.errorMessage);
        }
      });
  }
  await this.sleep(350);
  this.getCourses();
  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

}
