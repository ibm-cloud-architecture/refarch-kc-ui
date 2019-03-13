import { Injectable } from '@angular/core';
import { OrderedShipment } from './ordered-shipments/OrderedShipments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import { Voyage } from './voyages/Voyage';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  private shipmentBFFURL: string = "/api/shipments";
  private voyageBFFURL: string = "/api/voyages";

  constructor(private http: HttpClient) { }

  public getCurrentOrders(): Observable<OrderedShipment[]> {
    return this.http.get<OrderedShipment[]>(this.shipmentBFFURL)
    .pipe(map((data: OrderedShipment[]) => {
      return data;
    }));
  }

  public saveOrderShipment(os: OrderedShipment) {
    console.log('Save order shipment');
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<OrderedShipment>(this.shipmentBFFURL+ "/" + os.orderID, OrderedShipment, httpOptions);
  }

  public getVoyages(): Observable<Voyage[]>{
    return this.http.get<Voyage[]>(this.voyageBFFURL)
    .pipe(map((data: Voyage[]) => {
      return data;
    }));
  }

  public getVoyage(voyageID: string): Observable<Voyage>{
    return this.http.get<Voyage>(this.voyageBFFURL + "/" + voyageID )
    .pipe(map((data: Voyage) => {
      return data;
    }));
  }
}
