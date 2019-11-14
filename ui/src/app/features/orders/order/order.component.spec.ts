import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { Order } from '../Order';


fdescribe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let httpTestingController : HttpTestingController;
  let httpClient : HttpClient;

  beforeEach(async(() => {
    let order = { 'productId': '12ddd4', 'quantity': ' ', 'pickUpDate': ' ', 'expectedDeliveryDate': ' ',
    'pickUpAddress': '', 'destinationAddress': ' '}

    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        HttpClientTestingModule,
        HttpTestingController,
      ],
      providers: []
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an order', () => {
    expect(component.order).toBeDefined();
  })
});
