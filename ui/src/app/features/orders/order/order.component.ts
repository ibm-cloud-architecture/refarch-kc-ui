import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../Order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public errorMsg;

  @Input()
  order: Order;

  @Output()
  done = new EventEmitter<Order>();
  
  products: string[] = ["Fresh product 1", "Medical vaccin", "Carrot", "Fresh product 2"];
  
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
  }

  submit(){
    let callback = (newOrder: any) => this.done.emit(newOrder)

    // if there is no orderID we are creating a new order
    if(this.order.orderID == null) {
      this.orderService.saveOrder(this.order).subscribe(callback ); 
    } else {
      this.orderService.updateOrder(this.order).subscribe(callback);
    }
  }
  cancel(){
    this.done.emit(null);
  }

  edit(): boolean {
    return (this.order.status === undefined || this.order.status === null || this.order.status === "Created");
  }
}
