import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from './Container'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  containersUrl: string = "api/containers";
  constructor(private http: HttpClient) { }

  getContainers(): Observable<Container[]>{
    return this.http.get<Container[]>(this.containersUrl + "/")
    .pipe(map((data: Container[]) => {
      return data;
    }))
  }
}
