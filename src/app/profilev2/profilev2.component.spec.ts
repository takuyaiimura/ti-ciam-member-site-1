import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profilev2Component } from './profilev2.component';

describe('Profilev2Component', () => {
  let component: Profilev2Component;
  let fixture: ComponentFixture<Profilev2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Profilev2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Profilev2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
