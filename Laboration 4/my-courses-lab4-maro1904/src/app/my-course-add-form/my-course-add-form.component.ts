import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { addCourse } from '../types/course.type';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-course-add-form',
  templateUrl: './my-course-add-form.component.html',
  styleUrls: ['./my-course-add-form.component.css']
})
export class MyCourseAddFormComponent implements OnInit {
  results: addCourse[] = [];
  adder: addCourse = {} as addCourse;
  subscription: any;
  public href: string = "";
  
  constructor(private backendService : BackendService, private route: Router) { }

  ngOnInit(): void {

  }

  getCourses(){
    let obs = this.backendService.getMyCourses();
    obs.subscribe((data) => {
      this.results = data;
     
    });
  }

  async addCourse(){
    {
        this.backendService.addMyCourse(this.adder).subscribe({
        next: (newcourse: addCourse) => {
          this.adder = newcourse;
        },
        error: (err: string) => "Cant add course."
      });
    }
    await this.sleep(200);
    this.route.navigate(['/my-courses']);
  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


}
