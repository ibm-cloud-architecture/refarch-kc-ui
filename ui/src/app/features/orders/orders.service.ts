import { Injectable } from '@angular/core';
import { Observable,  throwError } from 'rxjs';
import { map } from  'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './Order';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  static loginURL(loginURL: any) {
    throw new Error("Method not implemented.");
  }
  ordersUrl: string = "/api/orders";

  constructor(private http: HttpClient) { }

  getOrders(manuf: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl + "/" + manuf)
    .pipe(map((data: Order[]) => {
      return data;
    }))
  }

  saveOrder(order:Order): Observable<Order> {
    console.log('Save order');
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Order>(this.ordersUrl, order, httpOptions)
  }

  updateOrder(order:Order): Observable<Order> {
    console.log('Update order: ' + order.orderID);
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Order>(`${this.ordersUrl}/${order.orderID}`, order, httpOptions);
  }
}
