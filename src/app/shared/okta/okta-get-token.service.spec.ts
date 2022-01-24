import { TestBed } from '@angular/core/testing';

import { OktaGetTokenService } from './okta-get-token.service';

describe('OktaGetTokenService', () => {
  let service: OktaGetTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaGetTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
