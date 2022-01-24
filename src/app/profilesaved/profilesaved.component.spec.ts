import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesavedComponent } from './profilesaved.component';

describe('ProfilesavedComponent', () => {
  let component: ProfilesavedComponent;
  let fixture: ComponentFixture<ProfilesavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
