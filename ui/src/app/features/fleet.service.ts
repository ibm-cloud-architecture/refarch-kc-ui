import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from  'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fleet } from './fleet/fleet';
import { Ship } from './fleet/ship/ship';
import { BehaviorSubject } from 'rxjs';
import { ShipControl } from './simulcontrol/shipControl';
import { FleetControl } from './simulcontrol/fleetControl'; 

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  // TODO remove those initializations {id: "f1", name: "KC-FleetNorth"}, {id: "f2", name: "KC-FleetSouth"}
  fleets: Fleet[] = [];
  ships: Ship[] = [];
  fleetsUrl: string = "http://localhost:3000/api/fleets";
  shipsUrl: string = "http://localhost:3000/api/ships";
  //fleetsUrl: string = "/api/fleets";
 // shipsUrl: string = "/api/ships";

  constructor(private http: HttpClient) { }

  public getFleetList(): Observable<Fleet[]> {
    if (this.fleets.length == 0)  {
      return this.http.get<Fleet[]>(this.fleetsUrl)
      .pipe(map(data => {
        this.fleets = data;
        return this.fleets;
      }))
    }
    return of(this.fleets);
  }

  public getShipsForFleet(fleetName: string): Observable<Ship[]> {
      return this.http.get<Fleet>(this.fleetsUrl + "/" + fleetName)
      .pipe(map((data: Fleet) => {
        this.ships = data.ships;
        return this.ships;
      }))
  }


  public processFleet(fc: FleetControl) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FleetControl>(this.fleetsUrl + "/simulate",fc,{ headers: headers });
  }



  public processShip(sc: ShipControl) {
    //let bodyString = JSON.stringify(  sc);
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<ShipControl>(this.shipsUrl + "/simulate",sc,httpOptions);
  }

 
}
