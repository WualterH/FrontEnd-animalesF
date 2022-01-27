import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPermisosComponent } from './agregar-permisos.component';

describe('AgregarPermisosComponent', () => {
  let component: AgregarPermisosComponent;
  let fixture: ComponentFixture<AgregarPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
