import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from  'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Fleet } from './fleet/fleet';
import { Ship } from './fleet/ship/ship';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  // TODO remove those initializations
  fleets: Fleet[] = [{id: "f1", name: "KC-FleetNorth"}, {id: "f2", name: "KC-FleetSouth"}];
  ships: Ship[] = [{name: "MarieRose",latitude: "37.8044",longitude: "-122.2711",status: "Docked",port: "Oakland",type: "Carrier",maxRow: 3,
   maxColumn: 7, numberOfContainers: 17 },
 {name: "BlackBear",latitude: "36.8044",longitude: "-140.2711",status: "AtSea",type: "Carrier",maxRow: 4,maxColumn: 8,numberOfContainers : 30 }]
  
 fleetsUrl: string = "fleets";
 shipsUrl: string = "ships";

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
    if (this.ships.length == 0)  {
      return this.http.get<Fleet[]>(this.shipsUrl)
      .pipe(map(data => {
        this.ships = data;
        return this.ships;
      }))
    }
    return of(this.ships);
  }
}
