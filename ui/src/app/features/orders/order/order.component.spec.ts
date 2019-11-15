import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { By } from '@angular/platform-browser';
import { OrdersModule } from '../orders.module';
import { Order } from '../Order';


/*
The order has @input() for the order so we need to inject an order instance to be able to
test the form. To do se we need to create a host, which is a orderscomponent.
*/
@Component({
  template: '<app-order [order]="mockOrder" (done)="handleOrderEdit($event)"></app-order>'
})
class TestHostComponent {
  mockOrder = { 'productID': 'P02', 'quantity': '10'}
  selectedOrder: Order;
  handleOrderEdit(order: Order) {
    this.selectedOrder = order;
  }
}

describe('OrderComponent', () => {
  let orderComponent: OrderComponent;

  let hostFixture : ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent ],
      imports: [
        FormsModule,
        OrdersModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    // Creating the TestHostComponent has the side-effect of creating a OrderComponent 
    // because the latter appears within the template of the former.
    hostFixture = TestBed.createComponent(TestHostComponent);
    orderComponent = hostFixture.debugElement.query(By.css('app-order')).nativeElement;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(orderComponent).toBeDefined();
  });

  it('should have an order passed as input', () => {
    expect(orderComponent.order.productID).toBe("P02");
  })


});
