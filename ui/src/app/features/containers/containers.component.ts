import { Component, OnInit, ViewChild } from '@angular/core';
import { Container } from './Container';
import { ContainersService } from './containers.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CONTAINERS } from './mock-container';
import { trigger, state, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContainersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type' , 'status'];
  dataSource = new MatTableDataSource<Container>();
  expandedElement: Container[] | null;

  containers: Container[];

  constructor(private router: Router, private containerService: ContainersService) { }

  ngOnInit() {
    //this.getContainersTest();
    this.showContainers();
  }

  showContainers() {
     this.containerService.getContainersList().subscribe(
      data => {this.containers = data}
      );
  } 

//this function test the UI with fake data

  /*getContainersTest(): void {
    this.containerService.getContainersTest().subscribe
    (containers => this.containers = containers);
  } */
}
