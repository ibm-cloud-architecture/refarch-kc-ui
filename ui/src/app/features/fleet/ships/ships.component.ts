import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../ship/ship';
import { ShipControl } from '../simulcontrol/shipControl';
import { FleetService } from '../../fleet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  @Input()
  fleetName : string;
  message: string;
  ships: Ship[];
  selectedship: Ship;
  simulControl: boolean = false;
  displayedColumns: string[] = ['name', 'type','status', 'port','latitude', 'longitude','actions'];

  constructor(private router: Router, private service: FleetService) {
    this.service.getShipsForFleet(this.fleetName).subscribe(
      data => {this.ships = data },
      error => { this.message = "Error retrieving ships"});
  }


  onSelect(ship: Ship): void {
     console.log("open " + JSON.stringify(ship));
     this.selectedship = ship;
     this.simulControl = false;
  }

  ngOnInit() {
  }

  simulate(ship:Ship) {
    console.log("simulate " + JSON.stringify(ship));
    this.selectedship = ship;
    this.simulControl = true;
  }

  getSimulControl():boolean {
    return (this.selectedship !== undefined && this.simulControl);
  }
}
