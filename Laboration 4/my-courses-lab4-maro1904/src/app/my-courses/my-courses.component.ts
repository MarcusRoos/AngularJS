import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { mycourses } from '../types/course.type';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  messageList: mycourses[] = [];
  messages : mycourses[] = [];
  filteredMessageList: mycourses[] = [];
  filterSearch: string = "";
 
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.getMessages();
    let obs = this.backendService.getMyCourses();
    obs.subscribe((data) => {
      this.messageList = data;

    });
  }

  getMessages() {
    this.messageList = [];
    let obs = this.backendService.getMyCourses();
    obs.subscribe((data) => {
      this.messageList = data;
      this.filteredMessageList = this.messageList;
    });
  }

}
