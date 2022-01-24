import { TestBed } from '@angular/core/testing';

import { OktaGetStatetokenService } from './okta-get-statetoken.service';

describe('OktaGetStatetokenService', () => {
  let service: OktaGetStatetokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaGetStatetokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
