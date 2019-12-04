import { TestBed } from '@angular/core/testing';

import { ContainersService } from './containers.service';

describe('ContainersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainersService = TestBed.get(ContainersService);
    expect(service).toBeTruthy();
  });
});
