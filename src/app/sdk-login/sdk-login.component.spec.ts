import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkLoginComponent } from './sdk-login.component';

describe('SdkLoginComponent', () => {
  let component: SdkLoginComponent;
  let fixture: ComponentFixture<SdkLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdkLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
