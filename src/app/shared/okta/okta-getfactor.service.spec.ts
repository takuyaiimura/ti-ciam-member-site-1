import { TestBed } from '@angular/core/testing';

import { OktaGetfactorService } from './okta-getfactor.service';

describe('OktaGetfactorService', () => {
  let service: OktaGetfactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaGetfactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
