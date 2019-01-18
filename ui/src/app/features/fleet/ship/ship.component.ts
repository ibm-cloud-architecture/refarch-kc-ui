import { Component, OnInit, Input } from '@angular/core';
import { Ship } from './ship';
import { Container } from './container';
import { ViewChild, ElementRef } from '@angular/core';
import { FleetService } from '../fleet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  ship: Ship;
  img: HTMLImageElement;
  canvasH:number = 200;
  canvasW:number = 230;

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(private router: Router, private service: FleetService) {
    this.ship = this.service.getSelectedShip();
    const rows = this.ship.maxRow;
    const cols = this.ship.maxColumn;
    this.img= new Image();
    this.img.src = 'assets/images/ship2.png';
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.img.onload = ()=> {
      this.context.drawImage(this.img, 0, this.canvasH-80,220,80);
  }
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvasW, this.canvasH);
    this.context.drawImage(this.img, 0, this.canvasH-80,220,80);
    this.drawMatrix();
  }

  ngOnInit(){

  }

  /*
  Call back so when the simulation is started the ship component can start listening to problem or containers
  The ship instance now has loaded containers.
  */
  doneSimul(){
    this.ship = this.service.getSelectedShip();
    // this.modifyMatrix(this.matrix);
    this.draw()
    this.listenToContainerOrProblem();
  }

  listenToContainerOrProblem(){
    // call BFF to get problems and container update
    // modify the UI
  }

  back() {
    this.router.navigate(['fleets']);
  }

  
  drawMatrix() {
    var cellWt = 180 / (this.ship.maxColumn+1);
    var cellHt = 180 / (this.ship.maxRow+1);
    var topRow = this.ship.containers.length-1;
    for(var i=topRow; i >= 0; --i){
      let y = this.canvasH - 20 - (i+1) * cellHt;
      let row = this.ship.containers[i];
      for(var j=0; j <= row.length -1; j++){
        let x = 30 + (j+1)* cellWt;
       
        let container: Container = row[j];
        console.log(x+" "+y+" "+ JSON.stringify(container));
        this.generateBorder(x, y, cellWt, cellHt);
        this.context.fillStyle = this.containerColor(container.status);
        this.context.fillRect(x , y , cellWt, cellHt);
      }
    }
  }

  containerColor(value) {
    if(value == 'empty'){
      return 'white';
    }
    if(value == 'FIRE'){
      return 'darkorange';
    }
    if(value == 'HEAT'){
      return 'crimson';
    }
    if(value == 'DOWN'){
      return 'red';
    }
    return 'grey';
  }

  generateBorder(cellWt, cellHt, cellwidth, cellheight, thick = 1) {
    this.context.fillStyle='#000';
    this.context.fillRect(cellWt - (thick), cellHt - (thick), cellwidth + (thick * 2), cellheight + (thick * 2));
  }

 

}
