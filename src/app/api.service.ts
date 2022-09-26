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

  public getAllOrders(): Observable<any> {
    return this.http.get('http://localhost:4201/orders');
  }

  public getOrderHistory(name): Observable<any> {
    return this.http.get('http://localhost:4201/orders/' + name);
  }

  public getProductByCategory(category): Observable<any> {
    return this.http.get('http://localhost:4201/selectProduct/' + category);
  }

  public postOrderHistory(httpBody): Observable<any> {
    return this.http.post<any>('http://localhost:4201/orders/', httpBody);
  }

  public getPopularProducts(): Observable<any> {
    return this.http.get('http://localhost:4201/popular');
  }

  public getUserById(name): Observable<any> {
    return this.http.get('http://localhost:4201/users/' + name)
  }

}
