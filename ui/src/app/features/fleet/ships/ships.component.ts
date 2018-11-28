import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../ship/ship';
import { FleetService } from '../../fleet.service';

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
  constructor(private service: FleetService) { 
    this.service.getShipsForFleet(this.fleetName).subscribe( 
      data => {this.ships = data }, 
      error => { this.message = "Error retreiving ships"});
  }

  ngOnInit() {
  }

}
