import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRespaldosComponent } from './dialog-respaldos/dialog-respaldos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    DialogRespaldosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FileUploadModule,
    BrowserModule
  ],
  exports: [
    ReactiveFormsModule,    
    DialogRespaldosComponent,
    FileUploadModule,   
  ]
})
export class DialogModule { }
