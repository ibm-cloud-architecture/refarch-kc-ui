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
  // Added for testing remove hardcoded value
  ship: Ship;

  matrix: [][] ;

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(private router: Router, private service: FleetService) {
    this.ship = service.getSelectedShip();
    this.matrix = this.createMatrix(this.ship.maxRow, this.ship.maxColumn);
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.generateMatrix(this.matrix);
  }

  ngOnInit() {
  }

  doneSimul(){
    // todo decide what to do when simulation result is cmpleted
  }

  back() {
    this.router.navigate(['fleets']);
  }

  createMatrix(row, col){
    var rows = [];
    var containerNo = this.ship.numberOfContainers;
    for (var i = row-1; i >= 0; --i) {
        rows[i] = [];
        for (var j = col-1; j >= 0; --j) {
            if(containerNo<=0){
              rows[i][j] = 0;
            }
            else{
              rows[i][j] = 1;
            }
            containerNo=containerNo-1;
        }
    }
    return rows;
}

  generateMatrix(matrix){
    var cellWt = 200 / this.ship.maxColumn;
    var cellHt = 200 / this.ship.maxRow;
    matrix.forEach((row, y) =>{
        row.forEach((value, x) => {
            this.generateBorder(x * cellWt, y * cellHt, cellWt, cellHt);
            this.context.fillStyle = this.matrixColor(value);
            this.context.fillRect(x * cellWt, y * cellHt, cellWt, cellHt);
        });
    });
}

matrixColor(value) {
    if(value == 0)
    {
        return 'white';
    }

    return 'grey';
}

generateBorder(cellWt, cellHt, cellwidth, cellheight, thick = 1)
{
  this.context.fillStyle='#000';
  this.context.fillRect(cellWt - (thick), cellHt - (thick), cellwidth + (thick * 2), cellheight + (thick * 2));
}

}
