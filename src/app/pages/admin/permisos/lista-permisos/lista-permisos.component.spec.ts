import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermisosComponent } from './lista-permisos.component';

describe('ListaPermisosComponent', () => {
  let component: ListaPermisosComponent;
  let fixture: ComponentFixture<ListaPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
