import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrdersService } from './orders.service';




describe('OrdersService', () => {

  let httpTestingController : HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpTestingController], 
    
  }))

 
  httpTestingController = TestBed.get(HttpTestingController);

  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });

  it('should return the orderID as the response', () => {

    const req = httpTestingController.expectOne('/api/orders');
    expect (req.request.method).toEqual('POST');
    req.flush({orderID: String});
  });
});



afterEach(() =>{

  
});
