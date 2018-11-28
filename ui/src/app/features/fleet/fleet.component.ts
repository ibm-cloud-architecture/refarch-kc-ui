import { Component, OnInit } from '@angular/core';
import { Fleet } from './fleet';
import { FleetService } from '../fleet.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {

  fleets: Fleet[] = [];
  message: string;
  selectedFleet: string;

  constructor(private service: FleetService) { 
    this.service.getFleetList().subscribe( 
      data => {this.fleets = data }, 
      error => { this.message = "Error retreiving fleets"});
  }

  ngOnInit() {
  }

}
