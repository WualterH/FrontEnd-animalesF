import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPermisosComponent } from './main-permisos/main-permisos.component';
import { AgregarPermisosComponent } from './agregar-permisos/agregar-permisos.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ListaPermisosComponent } from './lista-permisos/lista-permisos.component';



@NgModule({
  declarations: [MainPermisosComponent,AgregarPermisosComponent, ListaPermisosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class PermisosModule { }
