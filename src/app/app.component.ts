import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:4201/users').subscribe(data => {
      console.log(data);
    });
  }
}
