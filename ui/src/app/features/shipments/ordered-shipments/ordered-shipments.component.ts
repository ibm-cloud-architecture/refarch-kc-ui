import { Component, OnInit } from '@angular/core';
import { OrderedShipment } from './OrderedShipments';
import { ShipmentsService } from '../shipments.service';
import { OrdersService } from '../../orders/orders.service';

/* 
Present in a table formant to the Shipment Inc manager a list of current orders
*/
@Component({
  selector: 'app-ordered-shipments',
  templateUrl: './ordered-shipments.component.html',
  styleUrls: ['./ordered-shipments.component.css']
})
export class OrderedShipmentsComponent implements OnInit {
  orderedShipments: OrderedShipment[];
  columns: string[] = ['OrderID', 'Customer', 'Status', 'Voyage','actions'];
  selectedOrder: OrderedShipment;
  
  constructor(private shipmentService: ShipmentsService, private orderService: OrdersService) { 
    shipmentService.getCurrentOrders().subscribe( (data) => {
       this.orderedShipments = data;
    });
  }

  ngOnInit() {
  }

  open(order: OrderedShipment) {
    this.selectedOrder = order;
  }

  handleVoyageSelected(voyage){
    console.log(voyage);
    this.selectedOrder.voyageID=voyage;
    this.shipmentService.saveOrderShipment(this.selectedOrder);
    // call save voaygage
    this.selectedOrder = null;
  }
}
