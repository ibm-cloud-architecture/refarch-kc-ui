import { Component, Input, OnInit } from '@angular/core';
import { Ship } from '../fleet/ship/ship';
import { Command } from './command';
import { ShipControl } from './shipControl';
import { FleetService } from '../fleet.service';

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
  
  selectedCommand: Command;
  numberOfMinutes: number = 1;
    
  constructor(private service: FleetService) { }

  ngOnInit() {
  }

  simulate() {
    let sc: ShipControl = new ShipControl();
    sc.command = this.selectedCommand.value;
    sc.numberOfMinutes = this.numberOfMinutes;
    sc.shipName = this.ship.name;
    this.service.processShip(sc);
  }
}
