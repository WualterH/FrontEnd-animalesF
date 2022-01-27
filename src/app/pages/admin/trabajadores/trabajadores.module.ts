import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ListaTrabajadoresComponent } from './lista-trabajadores/lista-trabajadores.component';
import { MaterialModule } from 'src/app/material.module';
import { AgregarTrabajadorComponent } from './agregar-trabajador/agregar-trabajador.component';


@NgModule({
  declarations: [MainComponent, ListaTrabajadoresComponent, AgregarTrabajadorComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class TrabajadoresModule { }
