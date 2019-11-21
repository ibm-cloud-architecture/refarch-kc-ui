import { Component, OnInit } from '@angular/core';
import { Order } from './Order';
import { OrdersService } from './orders.service';
import { Address } from './Address';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['OrderID', 'From', "To", 'ExpectedDate', 'Status', 'actions'];
  orders: Order[];
  manufacturers: string[] = ['GoodManuf','OtherManuf'];
  selectedManufacturer: string;
  selectedOrder: Order;

  constructor(private orderService: OrdersService) {

  }

  ngOnInit() {
  }

  loadOrders(manuf) {
    console.log('Load orders for ' + manuf.value);
    this.orderService.getOrders(manuf.value).subscribe( 
      data => {this.orders = data}
    );
  }

  open(order: Order) {
    this.selectedOrder = order;
  }

  newOrder() {
    this.selectedOrder = new Order();
    this.selectedOrder.destinationAddress = new Address();
    this.selectedOrder.pickupAddress = new Address();
    this.selectedOrder.customerID = this.selectedManufacturer;
  }

  handleOrderEdit(newOrder: Order){
    if (newOrder !== undefined) {
      this.orders.push(newOrder);
    }
    this.selectedOrder = null;
  }
}
