import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { MainEncuestaComponent } from './encuestas/main-encuesta/main-encuesta.component';
import { ListaEncuestaComponent } from './encuestas/lista-encuesta/lista-encuesta.component';
import { AgregarEncuestaComponent } from './encuestas/agregar-encuesta/agregar-encuesta.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AgregarEncuestadorComponent } from './encuestador/agregar-encuestador/agregar-encuestador.component';
import { ListaEncuestadorComponent } from './encuestador/lista-encuestador/lista-encuestador.component';
import { MainEncuestadorComponent } from './encuestador/main-encuestador/main-encuestador.component';

@NgModule({
  declarations: [   
    MainEncuestaComponent, 
    ListaEncuestaComponent, 
    AgregarEncuestaComponent, 
    AgregarEncuestadorComponent, 
    ListaEncuestadorComponent, 
    MainEncuestadorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    MaterialModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AdminModule { }
