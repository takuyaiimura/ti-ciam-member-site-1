import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLoggedInNotificationComponent } from './not-logged-in-notification.component';

describe('NotLoggedInNotificationComponent', () => {
  let component: NotLoggedInNotificationComponent;
  let fixture: ComponentFixture<NotLoggedInNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotLoggedInNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotLoggedInNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
