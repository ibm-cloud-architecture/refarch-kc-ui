import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';
import { map, catchError } from  'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Fleet } from './fleet';
import { Ship } from './ship/ship';
import { BehaviorSubject } from 'rxjs';
import { ShipControl } from '../simulcontrol/shipControl';
import { FleetControl } from '../simulcontrol/fleetControl';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  fleets: Fleet[] = [];
  ships: Ship[] = [];
  selectedShip: Ship;
  fleetsUrl: string = "/api/fleets";
  shipsUrl: string = "/api/ships";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  setSelectedShip(ship: Ship) {
    this.selectedShip = ship;
  }

  getSelectedShip(){
    return this.selectedShip;
  }

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
    return this.http.post<FleetControl>(this.fleetsUrl + "/simulate",fc,{ headers: this.headers });
  }



  public processShip(sc: ShipControl): Observable<Ship> {
    return this.http.post(this.shipsUrl + "/simulate",sc ,{ headers: this.headers })
    .pipe(map((data: Ship) => {
        this.selectedShip = data;
        return data;
    }))
  }

  private handleError(where:string, error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
