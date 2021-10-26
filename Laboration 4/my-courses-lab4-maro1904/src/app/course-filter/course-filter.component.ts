import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { course } from '../types/course.type';
import { mycourses } from '../types/course.type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css']
})

export class CourseFilterComponent implements OnInit {
  @Input() filterText = "";
  @Input() mymessagesToFilter: mycourses[] = [];
  @Input() messagesToFilter: course[] = [];
  messages: course[] = [];
  mymessages: mycourses[] = [];
  @Output() filterTextChange = new EventEmitter<string>();
  @Output() messagesToFilterChange = new EventEmitter<course[]>();
  @Output() mymessagesToFilterChange = new EventEmitter<mycourses[]>();
  public href: string = "";

  get _filterText(): string {
    return this.filterText;
  }

  constructor(private route: Router) {}

  set _filterText(value: string) {
    this.filterText = value;
    this.onChange();
  }

  ngOnInit(): void {
    this.messages = this.messagesToFilter;
    this.mymessages = this.mymessagesToFilter;
    this.href = this.route.url;

  }


  onChange() {
    if (this.route.url != "/my-courses"){
    if (this.messagesToFilter.length > this.messages.length) {
      this.messages = this.messagesToFilter;
    }
    this.performFilter(this.filterText);
    this.filterTextChange.emit(this.filterText);
    console.log(this.messagesToFilter);
  } else {
    if (this.mymessagesToFilter.length > this.mymessages.length) {
      this.mymessages = this.mymessagesToFilter;
    }
    this.performMyFilter(this.filterText);
    this.filterTextChange.emit(this.filterText);
    console.log(this.mymessagesToFilter);
  }
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.messagesToFilter = this.messages.filter((message: course) =>
      ((message.courseCode != undefined && message.courseCode.toLocaleLowerCase().indexOf(filterBy) !== -1)) 
      || (message.name != undefined && message.name.toLocaleLowerCase().indexOf(filterBy) !== -1) 
      || (message.institutionCode != undefined && message.institutionCode.toLocaleLowerCase().indexOf(filterBy) !== -1)
      || (message.progression != undefined && message.progression.toLocaleLowerCase().indexOf(filterBy) !== -1)
      || (message.level != undefined && message.level.toLocaleLowerCase().indexOf(filterBy) !== -1)
      || (message.subject != undefined && message.subject.toLocaleLowerCase().indexOf(filterBy) !== -1)
      || (message.subjectCode != undefined && message.subjectCode.toLocaleLowerCase().indexOf(filterBy) !== -1));
    this.messagesToFilterChange.emit(this.messagesToFilter);
  
  }

  performMyFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.mymessagesToFilter = this.mymessages.filter((mymessage: mycourses) =>
      ((mymessage.courseCode != undefined && mymessage.courseCode.toLocaleLowerCase().indexOf(filterBy) !== -1)) 
      || (mymessage.completed != undefined && mymessage.completed.toLocaleLowerCase().indexOf(filterBy) !== -1)
      || (mymessage.name != undefined && mymessage.name.toLocaleLowerCase().indexOf(filterBy) !== -1));
    this.mymessagesToFilterChange.emit(this.mymessagesToFilter);
  
  }

}