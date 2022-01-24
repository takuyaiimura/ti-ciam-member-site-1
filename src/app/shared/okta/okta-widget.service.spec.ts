import { TestBed } from '@angular/core/testing';

import { OktaWidgetService } from './okta-widget.service';

describe('OktaWidgetService', () => {
  let service: OktaWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
