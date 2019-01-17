import { Component, OnInit, Input } from '@angular/core';
import { Ship } from './ship';
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

  matrix: [][] ;

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(private router: Router, private service: FleetService) {
    this.ship = this.service.getSelectedShip();
    const rows = this.ship.maxRow+1;
    const cols = this.ship.maxColumn+1;
    this.matrix = this.createMatrix(rows,cols);
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.generateMatrix(this.matrix);
  }

  ngOnInit(){

  }

  doneSimul(){
    this.modifyMatrix(this.matrix);
  }

  back() {
    this.router.navigate(['fleets']);
  }

  createMatrix(row, col) {
    console.log("Entered matrix creation");
    var rows = [];
    var containerNo = this.ship.numberOfContainers;
    console.log("container no"+containerNo);
    for (var i = row-1; i >= 0; --i) {
        console.log("i value "+i);
        rows[i] = [];
        for (var j = col-1; j >= 0; --j) {
            console.log("j value "+j);
            if(containerNo<=0){
              rows[i][j] = 'empty';
            }
            else{
              rows[i][j] = this.ship.containers[i][j].id;
            }
            containerNo=containerNo-1;
        }
    }
    return rows;
  }

  modifyMatrix(matrix) {
    console.log("simulation finished");
    for(var i=this.ship.maxRow; i >= 0; --i){
      console.log("Entered rows"+i);
            for(var j=this.ship.maxColumn; j >= 0; --j){
              console.log("Entered cols"+j);
            if(matrix[i][j]!='empty'){
              console.log("Status"+this.ship.containers[i][j].status);
              if(this.ship.containers[i][j].status==='DOWN'){
                matrix[i][j] = 'DOWN';
              }
              else if(this.ship.containers[i][j].status==='FIRE'){
                matrix[i][j] = 'FIRE';
              }
              else if(this.ship.containers[i][j].status==='HEAT'){
                matrix[i][j] = 'HEAT';
              }
              }
            else{
              console.log("didnot enter the empty spot"+matrix[i][j]);
            }
            }
        }
        this.generateMatrix(matrix);
  }

  generateMatrix(matrix) {
    var cellWt = 200 / (this.ship.maxColumn+1);
    var cellHt = 200 / (this.ship.maxRow+1);
    matrix.forEach((row, y) =>{
        row.forEach((value, x) => {
            this.generateBorder(x * cellWt, y * cellHt, cellWt, cellHt);
            this.context.fillStyle = this.matrixColor(value);
            this.context.fillRect(x * cellWt, y * cellHt, cellWt, cellHt);
        });
    });
  }

  matrixColor(value) {
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

  simulate() {
    this.modifyMatrix(this.matrix);
  }

}
