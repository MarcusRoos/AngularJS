export interface course {
    _id: number;
    subjectCode: string;
    subject: string;
    courseCode: string;
    level: string;
    progression: string;
    name: string;
    points: number;
    institutionCode: string;
    completed: string;
  }

  export interface subjects {
    _id: number;
    subjectCode: string;
    subject: string;
    preamble: string;
    bodyText: string;
    language: string;
  }

  export interface mycourses {
    _id: number;
    courseCode: string;
    name: string;
    completed: string;
  }

  export interface addCourse {
    _id: number;
    courseCode: string;
    completed: string;
  }