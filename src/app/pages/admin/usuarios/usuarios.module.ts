import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { MaterialModule } from 'src/app/material.module';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';



@NgModule({
  declarations: [MainUsuariosComponent, AgregarUsuariosComponent, ListaUsuariosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
  ]
})
export class UsuariosModule { }
