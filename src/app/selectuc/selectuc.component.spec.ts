import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectucComponent } from './selectuc.component';

describe('SelectucComponent', () => {
  let component: SelectucComponent;
  let fixture: ComponentFixture<SelectucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
