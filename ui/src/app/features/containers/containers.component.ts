import { Component, OnInit } from '@angular/core';
import { Container } from './Container';
import { ContainersService } from './containers.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  containers: Container[];
  message: string;

  constructor(private containerService: ContainersService) { }

  ngOnInit() {

  }

  showContainers() {
     this.containerService.getContainersList().subscribe(
      data => {this.containers = data}
      );
  }

}
