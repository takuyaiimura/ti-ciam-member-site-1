import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDisplaypageComponent } from './profile-displaypage.component';

describe('ProfileDisplaypageComponent', () => {
  let component: ProfileDisplaypageComponent;
  let fixture: ComponentFixture<ProfileDisplaypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDisplaypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDisplaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
