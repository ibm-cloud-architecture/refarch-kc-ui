import { Component, OnInit } from '@angular/core';
import { Fleet } from './fleet';
import { FleetService } from '../fleet.service';
import { FleetControl } from '../simulcontrol/fleetControl';

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

  startFleet() {
    console.log("Start simulate ship movement for the selected fleet");
    let fc: FleetControl = new FleetControl();
    fc.fleetName = this.selectedFleet;
    fc.command = "START";
    fc.numberOfMinutes = 3; 
    this.service.startFleet(fc);
  }

  stopFleet() {
    let fc: FleetControl = new FleetControl();
    fc.fleetName = this.selectedFleet;
    fc.command = "STOP";
    fc.numberOfMinutes = 3; 
     this.service.stopFleet(fc);
  }
}
