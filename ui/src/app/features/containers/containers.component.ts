import { Component, OnInit, ViewChild } from '@angular/core';
import { Container } from './Container';
import { ContainersService } from './containers.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { CONTAINERS } from './mock-container';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'temperature', 'humidity', 'co2', 'amp', 'status', 'row', 'column', 'shipId'];
  dataSource = new MatTableDataSource<Container>(CONTAINERS);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  containers: Container[];

  constructor(private router: Router, private containerService: ContainersService) { }

  ngOnInit() {
    this.getContainersTest();
    this.dataSource.sort = this.sort;
  }

  showContainers() {
     this.containerService.getContainersList().subscribe(
      data => {this.containers = data}
      );
  } 

  getContainersTest(): void {
    this.containerService.getContainersTest().subscribe
    (containers => this.containers = containers);
  }
}
