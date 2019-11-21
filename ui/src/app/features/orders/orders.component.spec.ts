import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders.component';
import { OrdersModule } from './orders.module';
import { OrdersService } from './orders.service';
import { Observable } from 'rxjs';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  // use a mockup for the service but as it return observable needs to use jasmine marble
  const orderServStub = {
    getOrders(manuf) {
      const orders$ = cold('--x|', {x: [{'orderID' : 'O01'}]})
      return orders$;
    }
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ OrdersModule, BrowserAnimationsModule],
      providers: [ { provide: OrdersService, useValue: orderServStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any orders', () => {
    expect(component.orders).toBeUndefined();
  });

  it('should load orders for a manuf', () => {
    component.loadOrders('manuf');
    getTestScheduler().flush(); // flush the observables
    expect(component.orders).toBeDefined();
  });

  it('should get the selected order on click', () => {
    expect(component.selectedOrder).toBeUndefined();
    // load the list of order
    component.loadOrders('manuf');
    getTestScheduler().flush();
    component.open(component.orders[0]);
    expect(component.selectedOrder.orderID).toBe("O01");
  });
});
