import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenexpireComponent } from './tokenexpire.component';

describe('TokenexpireComponent', () => {
  let component: TokenexpireComponent;
  let fixture: ComponentFixture<TokenexpireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenexpireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenexpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
