import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { subjects } from '../types/course.type';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {
  subjectdetail: subjects = {} as subjects;
  results: subjects[] = [];
  errorMessage: string = "";
  user_id: string;
  test : string;
  constructor(private backendService : BackendService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.params.subjectCode;
    this.test = code;
    console.log(code);
    this.backendService.getDetailSubject(code).subscribe
    if (code) {
      this.backendService.getDetailSubject(code).subscribe({
        next: profiles => {
          this.results = profiles;
          this.subjectdetail = this.results[0];
        },
        error: err => {
          this.errorMessage = err;
          console.error(this.errorMessage);
        }
      });
  }

}

}
