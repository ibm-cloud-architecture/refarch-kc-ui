import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShipmentsService } from './shipments.service';


describe('ShipmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
     ]
  }));

  it('should be created', () => {
    const service: ShipmentsService = TestBed.get(ShipmentsService);
    expect(service).toBeTruthy();
  });
});
