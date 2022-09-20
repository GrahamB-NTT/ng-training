import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get('http://localhost:4201/users');
  }

  public getOrderHistory(name): Observable<any> {
    return this.http.get('http://localhost:4201/orders/' + name);
  }

  public getProductByCategory(category): Observable<any> {
    return this.http.get('http://localhost:4201/selectProduct/' + category);
  }

}
