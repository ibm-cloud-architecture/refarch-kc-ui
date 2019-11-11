import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FleetService } from './fleet.service';

describe('FleetService', () => {
  let httpMock: HttpTestingController;
  let service : FleetService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FleetService],
      
    });
  });
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // assess if there is no more outstanding http request
    httpMock.verify();
  }));

  it('should be created', inject([FleetService], (service: FleetService) => {
    expect(service).toBeTruthy();
  }));
});
