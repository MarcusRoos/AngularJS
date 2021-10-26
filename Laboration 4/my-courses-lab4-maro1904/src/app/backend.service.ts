import { course } from './types/course.type';
import { mycourses } from './types/course.type';
import { subjects } from './types/course.type';
import { addCourse } from './types/course.type';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { 
    
  }
  getCourses(){
    return this.http.get<course[]>('https://my-courses-lab3-maro1904.herokuapp.com/api/courses');
  }

  getDetailCourses(courseCode: String) {
    return this.http.get<course[]>('https://my-courses-lab3-maro1904.herokuapp.com/api/courses' + '/' + courseCode);
  }

  getMyCourses() {
    return this.http.get<mycourses[]>('https://my-courses-lab3-maro1904.herokuapp.com/api/myCourses');
  }

  getDetailMyCourses(courseCode: String) {
    return this.http.get<mycourses[]>('https://my-courses-lab3-maro1904.herokuapp.com/api/myCourses' + '/' + courseCode);
  }

  getDetailSubject(subjectCode: String) {
    return this.http.get<subjects[]>('https://my-courses-lab3-maro1904.herokuapp.com/api/subjects' + '/' + subjectCode);
  }

  requestMethod() {     
    return this.http.get<subjects[]>('https://my-courses-lab3-maro1904.herokuapp.com/api/subjects');
 }

 deleteMyCourse(courseCode: String): Observable<mycourses> {
  return this.http.delete<mycourses>('https://my-courses-lab3-maro1904.herokuapp.com/api/myCourses' + '/' + courseCode, {
    withCredentials: false, headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  })
}

updateMyCourse(courseCode: String): Observable<mycourses> {
  return this.http.put<mycourses>('https://my-courses-lab3-maro1904.herokuapp.com/api/myCourses' + '/' + courseCode, {
    withCredentials: false, headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  })
}

addMyCourse(newCourse: addCourse): Observable<addCourse> {
  let tmpBool = newCourse.completed;
  let tmpPush = "";
  if (tmpBool){
    tmpPush = "YES";
  }
  else{
      tmpPush = "NO";
  }
  const body = {
    courseCode: newCourse.courseCode,
    completed: tmpPush,
}

  return this.http.post<addCourse>('https://my-courses-lab3-maro1904.herokuapp.com/api/myCourses' + '/add', body, {
    withCredentials: false, headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  })
  
}


 private handleError(errorResponse: HttpErrorResponse) {
  let errorMessage = '';
  if (errorResponse.error instanceof ErrorEvent) {
    errorMessage = `Client error message: ${errorResponse.error.message}`;
  } else {
    errorMessage = `Server error: ${errorResponse.status}, message: ${errorResponse.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

}