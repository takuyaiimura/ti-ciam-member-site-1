import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktacontentsComponent } from './oktacontents.component';

describe('OktacontentsComponent', () => {
  let component: OktacontentsComponent;
  let fixture: ComponentFixture<OktacontentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OktacontentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OktacontentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
