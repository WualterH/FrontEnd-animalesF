import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTrabajadorComponent } from './agregar-trabajador.component';

describe('AgregarTrabajadorComponent', () => {
  let component: AgregarTrabajadorComponent;
  let fixture: ComponentFixture<AgregarTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
