import { Component, OnInit, Input } from '@angular/core';
import { Ship } from './ship';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  // Added for testing remove hardcoded value
  ship: Ship = { name:'Ship Maha',
                 longitude:'1.77',
                 latitude:'1.08',
                 status:'Active',
                 port:'San Jose',
                 type:'Cargo',
                 numberOfContainers:5,
                 maxRow:7,
                 maxColumn:5,
                 containers: [
                   {id:'1',status:'safe'},
                   {id:'2',status:'damage'},
                   {id:'3',status:'safe'},
                   {id:'4',status:'damage'},
                   {id:'5',status:'safe'}
                 ]
               };

  matrix: [][]= this.createMatrix(this.ship.maxRow, this.ship.maxColumn);

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.generateMatrix(this.matrix);
  }

  ngOnInit() {
  }

  createMatrix(row, col){
    var rows = [];
    var containerNo = this.ship.numberOfContainers;
    for (var i = row-1; i >= 0; --i) {
        rows[i] = [];
        for (var j = col-1; j >= 0; --j) {
            if(containerNo<=0){
              rows[i][j] = 'empty';
            }
            else{
              rows[i][j] = this.ship.containers[containerNo-1].id;
            }
            containerNo=containerNo-1;
        }
    }
    return rows;
  }

  modifyMatrix(matrix){
    for(var i=this.ship.maxRow-1; i >= 0; --i){
            for(var j=this.ship.maxColumn-1; j >= 0; --j){
            if(matrix[i][j]!='empty'){
              if(this.ship.containers[j].status==='damage'){
                matrix[i][j] = 'damage';
              }
              }
            }
        }
        this.generateMatrix(matrix);
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
    if(value == 'empty')
    {
        return 'white';
    }

    if(value == 'damage'){
      return 'red';
    }

    return 'grey';
}

generateBorder(cellWt, cellHt, cellwidth, cellheight, thick = 1)
{
  this.context.fillStyle='#000';
  this.context.fillRect(cellWt - (thick), cellHt - (thick), cellwidth + (thick * 2), cellheight + (thick * 2));
}

simulate() {
  this.modifyMatrix(this.matrix);
}

}
