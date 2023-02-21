import { TestBed } from '@angular/core/testing';

import { CartApiServiceService } from './cart-api-service.service';

describe('CartApiServiceService', () => {
  let service: CartApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
