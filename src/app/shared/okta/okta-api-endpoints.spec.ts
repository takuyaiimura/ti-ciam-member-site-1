import { TestBed } from '@angular/core/testing';

import { OktaApiEndpoints } from './okta-api-endpoints';

describe('OktaApiEndpoints', () => {
  let service: OktaApiEndpoints;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaApiEndpoints);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
