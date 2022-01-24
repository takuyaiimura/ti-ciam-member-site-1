import { TestBed } from '@angular/core/testing';

import { PostToOktaService } from './post-to-okta.service';

describe('PostToOktaService', () => {
  let service: PostToOktaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostToOktaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
