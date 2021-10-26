import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { course } from '../types/course.type';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  @Input() filterSearch: course[] = [];
  constructor(private backendService : BackendService) { }
  public results:course[];
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    let obs = this.backendService.getCourses();
    obs.subscribe((data) => {
      this.results = data;
    });
  }


}
