import { TestBed } from '@angular/core/testing';

import { ShipmentsService } from './shipments.service';

describe('ShipmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShipmentsService = TestBed.get(ShipmentsService);
    expect(service).toBeTruthy();
  });
});
