import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { DomSanitizer} from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  archivos: any[];
  servicio: string;

}

@Component({
  selector: 'app-dialog-downloads',
  templateUrl: './dialog-downloads.component.html',
  styleUrls: ['./dialog-downloads.component.css']
})
export class DialogDownloadsComponent implements OnInit {

  archivos!: any[];
  archivos2!: any;
  servicio!: string;
  imagen: any;
  timeStamp = '';
  descargarImagen = '';

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private encuestaService: EncuestaService, 
    private sanitizer: DomSanitizer, 
    private snackBar: MatSnackBar,  
  ) {
    this.archivos = this.data.archivos; 
    this.servicio = this.data.servicio;           
  }
  
  ngOnInit(): void {
    this.archivos2 = this.archivos;    
    if (this.servicio === 'video-encuesta') {     
      this.encuestaService.buscarImagen(this.archivos2)
      .pipe()
      .subscribe(
        (data:any) => {                                     
          this.imagen = window.URL.createObjectURL(data);        
          this.descargarImagen = window.URL.createObjectURL(data);
          this.imagen = this.sanitizer.bypassSecurityTrustUrl(this.imagen);          
        },
        (error: any) => {
          (document.getElementById('cerrarModal') as HTMLInputElement).click();
          this.snackBar.open('No existe documento asociado a este ingreso', 'cerrar', {
            duration: 2000,
            verticalPosition: 'top',
          });
          console.log(error);
        }
      );
    }
    
  }

  loaded(event: any) {    
    this.timeStamp = event.timeStamp;
  }

}
