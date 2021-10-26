import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kurser';
  description = 'Följande kurser finns i vårt kursutbud:'
  dataSourceLink = 'https://my-courses-lab3-maro1904.herokuapp.com/';
  dataSourceName = 'Lab3 Maro1904 - Heroku';
}
