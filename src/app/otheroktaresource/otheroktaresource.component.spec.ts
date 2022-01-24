import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtheroktaresourceComponent } from './otheroktaresource.component';

describe('OtheroktaresourceComponent', () => {
  let component: OtheroktaresourceComponent;
  let fixture: ComponentFixture<OtheroktaresourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtheroktaresourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtheroktaresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
