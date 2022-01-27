import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { RolesService } from '../../../services/roles.service';
import { Roles } from 'src/app/shared/models/roles.interface';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {

 @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();

  debouncer: Subject<boolean> = new Subject();

  constructor(
    private modalService: NgbModal,
    private alert:AlertHelper,
    private roles_services:RolesService) { 
  }

  roles:Roles={
    nombre:"",
    descripcion:"",
    estado:true,
  }
  
  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }



  limpiar_roles():void{
    this.roles.nombre=""
    this.roles.descripcion=""
    this.roles.estado=true
  }

  open(content:any) {
    this.limpiar_roles();
    this.modalService.open(content);

  }

  agregar(){
    if(this.roles.nombre.trim().length==0 || this.roles.descripcion.trim().length==0)
    { 
      this.alert.errorAlert('Los campos no pueden estar vacios.');
      return;
    }

    this.roles_services.Create_roles(this.roles).subscribe(res => {

      if (res.success==true) {
        this.alert.success_small(res.msg!)
        this.modalService.dismissAll();
        this.limpiar_roles();
        this.debouncer.next( true );
      }else{
        this.alert.error_small(res.msg!)
      }
    })
  }





}
