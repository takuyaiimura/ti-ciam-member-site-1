import { TestBed } from '@angular/core/testing';

import { GetUserinfoService } from './get-userinfo.service';

describe('GetUserinfoService', () => {
  let service: GetUserinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
