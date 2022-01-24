import { TestBed } from '@angular/core/testing';

import { OktaMfaService } from './okta-mfa.service';

describe('OktaMfaService', () => {
  let service: OktaMfaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaMfaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
