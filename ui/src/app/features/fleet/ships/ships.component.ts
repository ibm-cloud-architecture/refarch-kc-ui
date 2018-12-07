import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../ship/ship';
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

  constructor(private router: Router, private service: FleetService) {
    this.service.getShipsForFleet(this.fleetName).subscribe(
      data => {this.ships = data },
      error => { this.message = "Error retreiving ships"});
  }

  selectedship: Ship;
  onSelect(ship: Ship): void {
  this.selectedship = ship;
  }

  ngOnInit() {
  }


}
