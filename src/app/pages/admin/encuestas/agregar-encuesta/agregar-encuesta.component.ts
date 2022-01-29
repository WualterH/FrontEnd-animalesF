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
  @Input() list_encuestadores!:Encuestador[];
  debouncer: Subject<boolean> = new Subject();  

  encuestas:Encuesta={
    nombre:"",
    apellido:"",
    animal: "",
    encuestador: 0,
    id_encuestador:0     
  }

  constructor(
    private modalService: NgbModal,
    private alert: AlertHelper,
    private encuestaService: EncuestaService,
  ) { }

  ngOnInit(): void {
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
    this.encuestas.encuestador = this.encuestas.id_encuestador;    
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
