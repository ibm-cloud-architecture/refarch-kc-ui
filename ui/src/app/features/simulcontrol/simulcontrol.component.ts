import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ship } from '../fleet/ship/ship';
import { Command } from './command';
import { ShipControl } from './shipControl';
import { FleetService } from '../fleet/fleet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulcontrol',
  templateUrl: './simulcontrol.component.html',
  styleUrls: ['./simulcontrol.component.css']
})
export class SimulcontrolComponent implements OnInit {


  @Input()
  ship: Ship;
  @Output()
  done = new EventEmitter<boolean>();

  commands: Command[] = [{name: "Containers on fire", value: "CONTAINER_FIRE" },
    {name: "Reefer down", value: "REEFER_DOWN" },
    {name: "Heat wave", value: "HEAT_WAVE" }];
  
  selectedCommand: string;
  numberOfMinutes: number = .4;
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
    this.service.processShip(sc).subscribe( data => {
      console.log(data);
      this.done.emit(true);
    });
    
  }

  resetSimulation(){
    let sc: ShipControl = new ShipControl();
    sc.command = "STOP";
    sc.numberOfMinutes = this.numberOfMinutes;
    sc.shipName = this.ship.name;
    this.service.processShip(sc).subscribe( data => {
      console.log(data);
      this.done.emit(true);
    });
  }
}
