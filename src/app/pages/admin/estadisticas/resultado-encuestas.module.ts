import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ResultadoEncuestasComponent } from './resultado-encuestas/resultado-encuestas.component';



@NgModule({
  declarations: [
    ResultadoEncuestasComponent
  ],
  imports: [
    CommonModule,    
    MaterialModule,
    FormsModule,    
    MaterialModule
  ]
})
export class ResultadoEncuestasModule { }
