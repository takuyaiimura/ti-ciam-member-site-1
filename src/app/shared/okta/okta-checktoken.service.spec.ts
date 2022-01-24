import { TestBed } from '@angular/core/testing';

import { OktaChecktokenService } from './okta-checktoken.service';

describe('OktaChecktokenService', () => {
  let service: OktaChecktokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaChecktokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
