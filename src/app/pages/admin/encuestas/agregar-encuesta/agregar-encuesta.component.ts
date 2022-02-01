import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { debounceTime } from 'rxjs/operators';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';
import { FileUploader } from 'ng2-file-upload';
import { DialogRespaldosComponent } from '../../dialogs/dialog-respaldos/dialog-respaldos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-encuesta',
  templateUrl: './agregar-encuesta.component.html',
  styleUrls: ['./agregar-encuesta.component.css']
})
export class AgregarEncuestaComponent implements OnInit {

  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();  
  debouncer: Subject<boolean> = new Subject();    
  
  
  encuestas:Encuesta={
    nombre:"",
    apellido:"",
    animal: "",
    encuestador: "",
    url: "",
    idEncuestador:0     
  }

  nombreUsuario: any;
  idEncuestador: any;

  constructor(
    private modalService: NgbModal,
    private alert: AlertHelper,
    private encuestaService: EncuestaService,
    private dialog: MatDialog
  ) { }

  imageUrlApi = 'http://localhost:4000/animalesF/upload';
  public uploader:FileUploader=new FileUploader({
    url:this.imageUrlApi, itemAlias:'video'
  });

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');    
    this.idEncuestador = localStorage.getItem('idEncuestador');    

    this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });

      this.uploader.onAfterAddingFile = (file:any)=> { 
        file.withCredentials = false; };

      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("uploaded successfully",  status);
      }
  }

  open(content:any){    
    this.limpiar_Encuesta();
    this.modalService.open(content);
  }

  validarEncuesta(){
    if(this.encuestas.nombre.trim().length==0){
      this.alert.errorAlert('Los campos no pueden estar vacios.')
    }
  }

  limpiar_Encuesta(){
    this.encuestas.nombre=""; 
  }

  agregar(){
    this.validarEncuesta()
    const dialogRef = this.dialog.open(DialogRespaldosComponent, {

      data: { url: 'encuesta/upload' }
    });   
    dialogRef.afterClosed().subscribe(result => {     
    this.encuestas.url = result;    
    this.encuestas.encuestador = this.nombreUsuario;
    this.encuestas.idEncuestador = this.idEncuestador;            
      this.encuestaService.Create_encuesta(this.encuestas).subscribe((res:any)=>{         
        if (res.succes==true) {          
          this.alert.success_small(res.msg!)          
          this.modalService.dismissAll();          
          this.limpiar_Encuesta();
          this.debouncer.next( true );          
        }else{
          this.alert.error_small(res.msg!)
        }
    })
    });
  }

}
