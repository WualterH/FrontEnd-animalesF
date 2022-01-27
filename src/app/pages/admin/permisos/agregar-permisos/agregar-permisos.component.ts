import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PermisoService } from 'src/app/pages/services/permisos.service';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Permiso } from 'src/app/shared/models/permisos.interface';

@Component({
  selector: 'app-agregar-permisos',
  templateUrl: './agregar-permisos.component.html',
  styleUrls: ['./agregar-permisos.component.css']
})
export class AgregarPermisosComponent implements OnInit {

  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();
  debouncer: Subject<boolean> = new Subject();

  permisos:Permiso={
    nombre:"",
    descripcion:"",
  }

  constructor(
    private modalService: NgbModal,
    private permisoService: PermisoService,
    private alert:AlertHelper,
  ) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }

  open(content:any){
    this.limpiar_Permiso();
    this.modalService.open(content);
  }

  validarPermiso(){
    if(this.permisos.nombre.trim().length==0 || this.permisos.descripcion.trim().length==0){
      this.alert.errorAlert('Los campos no pueden estar vacios.')
    }
  }

  limpiar_Permiso(){
    this.permisos.nombre="";
    this.permisos.descripcion="";
  }

  agregar(){

    this.validarPermiso()
      this.permisoService.Create_permiso(this.permisos).subscribe((res:any)=>{
        if (res.success==true) {
          this.alert.success_small(res.msg!)
          this.modalService.dismissAll();
          this.limpiar_Permiso();
          this.debouncer.next( true );
        }else{
          this.alert.error_small(res.msg!)
        }
    })
    
  }

}
