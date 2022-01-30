import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { debounceTime } from 'rxjs/operators';
import { Encuestador } from 'src/app/shared/models/encuestador.interface';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';

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
    idEncuestador:0     
  }

  nombreUsuario: any;
  idEncuestador: any;

  constructor(
    private modalService: NgbModal,
    private alert: AlertHelper,
    private encuestaService: EncuestaService,
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');    
    this.idEncuestador = localStorage.getItem('idEncuestador');    

    this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
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
    this.encuestas.encuestador = this.nombreUsuario;
    this.encuestas.idEncuestador = this.idEncuestador;        
      this.encuestaService.Create_encuesta(this.encuestas).subscribe((res:any)=>{
        if (res.success==true) {
          this.alert.success_small(res.msg!)
          this.modalService.dismissAll();
          this.limpiar_Encuesta();
          this.debouncer.next( true );
        }else{
          this.alert.error_small(res.msg!)
        }
    })
    
  }

}
