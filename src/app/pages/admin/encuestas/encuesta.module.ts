import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainEncuestaComponent } from './main-encuesta/main-encuesta.component';
import { ListaEncuestaComponent } from './lista-encuesta/lista-encuesta.component';
import { AgregarEncuestaComponent } from './agregar-encuesta/agregar-encuesta.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    MainEncuestaComponent,
    ListaEncuestaComponent,
    AgregarEncuestaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FileUploadModule,
  ]
})
export class EncuestaModule { }
