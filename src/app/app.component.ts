import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit() {
    this.api.getUsers().subscribe(data => {
      console.log(data);
    });
  }
}
