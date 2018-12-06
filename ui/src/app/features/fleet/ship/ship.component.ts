import { Component, OnInit, Input } from '@angular/core';
import { Ship } from './ship';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  @Input()
  ship: Ship;

  sub: any;

  greetMessage: string = "I am Child";

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.context.fillStyle = 'grey';
    // i<=ship.numberOfContainers to be done
    for (var i=0; i<20; i++) {
      this.context.fillRect(2+(i*20), 2, 10, 10);
    }
    this.context.fillStyle = 'blue';
    this.context.fillRect(2, 100, 400, 50);
  }

  private draw() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(300,300);
    this.context.stroke();
  }

  ngOnInit() {
  }

}
