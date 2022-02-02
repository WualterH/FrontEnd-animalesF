import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Roles } from 'src/app/shared/models/roles.interface';
import { GetAllUsuarios, Usuario } from 'src/app/shared/models/user.interface';
import { RolesService } from '../../../services/roles.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.css']
})
export class MainUsuariosComponent implements OnInit {

  Usuarios_list_main:GetAllUsuarios[]=[]
  Roles_list_main:Roles[]=[]


  constructor(
    private user_services:UsuariosService,
    private roles_services:RolesService) {


  }


  
  ngOnInit(): void {

    this.roles_services.GetAll_roles().subscribe((res: Roles[])=>{
      this.Roles_list_main=res
    })
  

    this.user_services.GetAll_usuario().subscribe((res:GetAllUsuarios[])=>{
      this.Usuarios_list_main=res;      

    })
  }

  actualizarTabla(event:boolean):void {

    this.user_services.GetAll_usuario().subscribe((res:GetAllUsuarios[])=>{
      this.Usuarios_list_main=res;
    })


  }




}
