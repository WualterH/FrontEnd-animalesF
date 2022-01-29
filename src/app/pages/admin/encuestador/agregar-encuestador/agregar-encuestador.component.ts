import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { EncuestadorService } from 'src/app/pages/services/encuestador.service';
import { Encuestador } from 'src/app/shared/models/encuestador.interface';

@Component({
  selector: 'app-agregar-encuestador',
  templateUrl: './agregar-encuestador.component.html',
  styleUrls: ['./agregar-encuestador.component.css']
})
export class AgregarEncuestadorComponent implements OnInit {

  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();

  debouncer: Subject<boolean> = new Subject();

  encuestadores: Encuestador = {
    nombre:"",
  }

  constructor(
    private modalService: NgbModal,
    private alert: AlertHelper,
    private encuestadorService: EncuestadorService
  ) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }

  open(content:any){
    this.limpiar_Encuestador();
    this.modalService.open(content);
  }

  validarEncuestador(){
    if(this.encuestadores.nombre.trim().length==0){
      this.alert.errorAlert('Los campos no pueden estar vacios.')
    }
  }

  limpiar_Encuestador(){
    this.encuestadores.nombre=""; 
  }

  agregar(){
    this.validarEncuestador()
      this.encuestadorService.Create_encuestador(this.encuestadores).subscribe((res:any)=>{
        if (res.success==true) {
          this.alert.success_small(res.msg!)
          this.modalService.dismissAll();
          this.limpiar_Encuestador();
          this.debouncer.next( true );
        }else{
          this.alert.error_small(res.msg!)
        }
    })
    
  }

}
