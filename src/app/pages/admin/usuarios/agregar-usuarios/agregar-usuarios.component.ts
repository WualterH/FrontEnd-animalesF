import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Roles } from 'src/app/shared/models/roles.interface';
import { Usuario } from 'src/app/shared/models/user.interface';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {


  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();
  @Input() Roles_list!: Roles[];

  debouncer: Subject<boolean> = new Subject();

  constructor(
    private modalService: NgbModal,
    private auth:AuthService,
    private alert:AlertHelper,
    private user_services:UsuariosService) { 
    }

  usuario:Usuario={
    
    nombre_usuario:"",
    email_usuario:"",
    clave_usuario:"",
    estado_usuario:true,
    id_rol:0
  }
  
  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }

  
  ActualizarTabla() {
    this.debouncer.next( true );
  }

  limpiar_usuario():void{
    this.usuario.nombre_usuario=""
    this.usuario.email_usuario=""
    this.usuario.clave_usuario=""
    this.usuario.estado_usuario=true
    this.usuario.id_rol=0
  }

  open(content:any) {
    this.limpiar_usuario();
    this.modalService.open(content);
  }

  agregar(){

    if((this.auth.esEmailValido(this.usuario.email_usuario))===false){
      this.alert.error_small('El email no tiene formato');
    }

    if(this.usuario.nombre_usuario.trim().length==0 || 
      this.usuario.email_usuario.trim().length==0 || 
      this.usuario.clave_usuario.trim().length==0)
    { this.alert.errorAlert('Los campos no pueden estar vacios.')}



    console.log(this.usuario.nombre_usuario)
    console.log(this.usuario.email_usuario)
    console.log(this.usuario.clave_usuario)
    console.log(this.usuario.estado_usuario)
    console.log(this.usuario.id_rol)
    console.log("-------------Datos del usuario --------")

    this.user_services.Create_usuario(this.usuario).subscribe((res)=>{
      if (res.success==true) {
        this.alert.success_small(res.msg!)
        this.modalService.dismissAll();
        this.limpiar_usuario();
        this.ActualizarTabla()
      }else{
        this.alert.error_small(res.msg!)
      }
    })




  }




}
