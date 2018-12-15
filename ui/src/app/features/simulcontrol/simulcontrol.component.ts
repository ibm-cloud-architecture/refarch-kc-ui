import { Component, Input, OnInit } from '@angular/core';
import { Ship } from '../fleet/ship/ship';
import { Command } from './command';
import { ShipControl } from './shipControl';
import { FleetService } from '../fleet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulcontrol',
  templateUrl: './simulcontrol.component.html',
  styleUrls: ['./simulcontrol.component.css']
})
export class SimulcontrolComponent implements OnInit {


  @Input()
  ship: Ship;

  commands: Command[] = [{name: "Simulate containers on fire", value: "CONTAINER_FIRE" },
    {name: "Simulate Reefer down", value: "REEFER_DOWN" },
    {name: "Simulate heat wave", value: "HEAT_WAVE" }];
  
  selectedCommand: string;
  numberOfMinutes: number = 1;
  message: string = "";
    
  constructor(private service: FleetService,
            private router: Router ) { }

  ngOnInit() {
  }

  startSimulation() {
    let sc: ShipControl = new ShipControl();
    sc.command = this.selectedCommand;
    sc.numberOfMinutes = this.numberOfMinutes;
    sc.shipName = this.ship.name;
    this.service.processShip(sc).subscribe(
      (data) => {this.router.navigate(['fleets']);},
      (error) => { this.message = error.statusText}
    );
    
  }
}
