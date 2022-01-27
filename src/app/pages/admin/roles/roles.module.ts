import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MainRolesComponent } from './main-roles/main-roles.component';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';
import { FormsModule } from '@angular/forms';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';



@NgModule({
  declarations: [MainRolesComponent,AgregarRolComponent, ListaRolesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class RolesModule { }
