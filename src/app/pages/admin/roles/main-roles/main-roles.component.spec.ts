import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRolesComponent } from './main-roles.component';

describe('MainRolesComponent', () => {
  let component: MainRolesComponent;
  let fixture: ComponentFixture<MainRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
