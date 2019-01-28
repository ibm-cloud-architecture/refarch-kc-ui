import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderedShipment } from '../ordered-shipments/OrderedShipments';
import { Voyage } from './Voyage';
import { ShipmentsService } from '../shipments.service';

/**
 * Present the list of possible voyages
 */
@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.css']
})
export class VoyagesComponent implements OnInit {

  @Input()
  order: OrderedShipment;

  @Output()
  done = new EventEmitter<string>();

  voyages: Voyage[];
  columns: string[] = ['VoyageID', 'Status', 'Ship','StartDate','StartPort','EndDate','EndPort','actions'];
  selectedVoyage: string;

  constructor(private shipmentService: ShipmentsService) { 
    
  }

  ngOnInit() {
    if (this.order.voyageID === null || this.order.voyageID === undefined) {
        this.shipmentService.getVoyages().subscribe( (data) => {
          this.voyages = data;
      });
    } else {
      this.shipmentService.getVoyage(this.order.voyageID).subscribe( (data) => {
        this.voyages = [];
        this.voyages.push(data);
      });
    }
  }

  save(){
    this.done.emit(this.selectedVoyage);
  }
}
