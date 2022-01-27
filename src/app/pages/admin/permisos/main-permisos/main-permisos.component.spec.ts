import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPermisosComponent } from './main-permisos.component';

describe('MainPermisosComponent', () => {
  let component: MainPermisosComponent;
  let fixture: ComponentFixture<MainPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
