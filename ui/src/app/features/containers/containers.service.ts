import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Container } from './Container'
import { map } from 'rxjs/operators';
import { CONTAINERS } from './mock-container'


@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  containers: Container[] = [];
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type':
  'application/json' });

  containersUrl: string = "api/containers";

  constructor(private http: HttpClient) { }

  public getContainersList(): Observable<Container[]>{
    return this.http.get<Container[]>(this.containersUrl + "/")
    .pipe(map(data => {
      this.containers = data;
      return this.containers;
    }))
  } 

  //test function to test the UI
  /*
  public getContainersTest(): Observable<Container[]>{
    return of (CONTAINERS);
  } */
}
