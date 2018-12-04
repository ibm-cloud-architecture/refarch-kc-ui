import { Component, OnInit, Input } from '@angular/core';
import { Ship } from './ship';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  @Input()
  ship: Ship;

  constructor() { }

  ngOnInit() {
  }

}
