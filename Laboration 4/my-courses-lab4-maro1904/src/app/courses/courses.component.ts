import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { course } from '../types/course.type';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  messageList: course[] = [];
  messages : course[] = [];
  filteredMessageList: course[] = [];
  filterSearch: string = "";

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getMessages();
    let obs = this.backendService.getCourses();
    obs.subscribe((data) => {
      this.messageList = data;

    });
  }

  getMessages() {
    this.messageList = [];
    let obs = this.backendService.getCourses();
    obs.subscribe((data) => {
      this.messageList = data;
      this.filteredMessageList = this.messageList;
    });
  }

}