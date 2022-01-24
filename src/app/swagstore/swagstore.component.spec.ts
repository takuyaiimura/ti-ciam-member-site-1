import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagstoreComponent } from './swagstore.component';

describe('SwagstoreComponent', () => {
  let component: SwagstoreComponent;
  let fixture: ComponentFixture<SwagstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwagstoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
