import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { OrdersService } from '../orders.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatSelectModule } from '@angular/material/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrdersModule } from '../orders.module';



fdescribe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderStub;

  beforeEach(async(() => {
    let order = { 'productID': ' ', 'quantity': ' ', 'pickUpDate': ' ', 'expectedDeliveryDate': ' ',
    'pickUpAddress': ' ', 'destinationAddress': ' '}
    orderStub = jasmine.createSpyObj("orderStub", ['createOrder']);
    //orderStub.createOrder(order);
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        // MatFormFieldModule,
        // MatDatepickerModule,
        // MatSelectModule,
        OrdersModule,
        HttpClientTestingModule
      ],
      providers: [ { provide: OrdersService, useValue: orderStub } ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should create an order', () => {
    expect(component.order)
  })
});
