import { TestBed } from '@angular/core/testing';
import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('OrdersService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
     ]
  }));
let httpTestingController : HttpTestingController;

//httpTestingController = TestBed.get(httpTestingController);
  
  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });
 
 /* it('should return the orderID as the response', () => {
    const req = httpTestingController.expectOne('/api/orders');
    expect (req.request.method).toEqual('POST');
    req.flush({orderID: String});
  }); */
});

afterEach(() =>{
});
