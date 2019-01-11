import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../Order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  order: Order;

  @Output()
  done = new EventEmitter<Order>();
  
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
  }

  submit(){
    this.orderService.saveOrder(this.order).subscribe( (norder) => {
      this.done.emit(norder);
    });
    
  }

  cancel(){
    this.done.emit(null);
  }
}
