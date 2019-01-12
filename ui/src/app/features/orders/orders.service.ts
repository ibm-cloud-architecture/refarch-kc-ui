import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from  'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersUrl: string = "http://localhost:3000/api/orders";

  constructor(private http: HttpClient) { }

  getOrders(manuf: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl + "/" + manuf)
    .pipe(map((data: Order[]) => {
      return data;
    }))
  }

  saveOrder(order:Order): Observable<Order> {
    console.log('let save the order');
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Order>(this.ordersUrl ,order,httpOptions);

  }
}
