import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { mycourses } from '../types/course.type';

@Component({
  selector: 'app-my-course-list',
  templateUrl: './my-course-list.component.html',
  styleUrls: ['./my-course-list.component.css']
})
export class MyCourseListComponent implements OnInit{
  @Input() filterSearch: mycourses[] = [];
  constructor(private backendService : BackendService) { }
  public results:mycourses[];
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    let obs = this.backendService.getMyCourses();
    obs.subscribe((data) => {
      this.results = data;

    });
  }

}