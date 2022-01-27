import { Component,EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { GetAllUsuarios } from 'src/app/shared/models/user.interface';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from 'src/app/shared/models/roles.interface';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})



export class ListaUsuariosComponent implements OnInit {

  @Input() Usuarios_list!: GetAllUsuarios[];
  @Input() Roles_list!: Roles[];
  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();

  debouncer: Subject<boolean> = new Subject();

  usuario_update={
    id:0,
    nombre_usuario:"",
    email_usuario:"",
    clave_usuario:"",
    estado_usuario:false,
    id_rol:0
  }
  

  displayedColumns: string[] = ['id','nombre_usuario','email_usuario','rol','estado_usuario','actions'];
  dataSource = new MatTableDataSource<GetAllUsuarios>(this.Usuarios_list);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alert:AlertHelper,
    private user_services:UsuariosService,
    private modalService: NgbModal
  ){}



  ngOnInit(): void {

     this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });

  }

  limpiar_usuario(){
    this.usuario_update.nombre_usuario=""
    this.usuario_update.email_usuario=""
    this.usuario_update.clave_usuario=""
    this.usuario_update.estado_usuario=false
    this.usuario_update.id_rol=0
  }

  validar_Actualizacion():boolean {
    if(
      this.usuario_update.nombre_usuario.trim().length==0 || 
      this.usuario_update.email_usuario.trim().length==0 ||
      this.usuario_update.clave_usuario.trim().length==0 ||
      this.usuario_update.id_rol==0
      ){
        this.alert.error_small("Los campos no pueden estar vacios.")
        return false
    }else{
      return true
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.Usuarios_list!=undefined){
      if (!changes.Usuarios_list.firstChange) {
        this.dataSource = new MatTableDataSource<GetAllUsuarios>(this.Usuarios_list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  open(content:any,id:number){
    this.usuario_update.id=id
    this.limpiar_usuario()
    this.modalService.open(content);
  }

  actualizar_usuario(){
    const validacion=this.validar_Actualizacion();
    if(!validacion){
      console.log("retornando");
      return 
    }

    this.user_services.Actualizar_usuario(this.usuario_update).subscribe(res=>{
      console.log(res)
    })

    console.log(this.usuario_update);

  }

  Desabilitar_Habilitar_Usuario(id:number,estado_usuario:boolean){

    let Title=""

    if (estado_usuario==true) {
      Title="Habilitar"
    }else{
      Title="Inabilitar"
    }

    const user={
      id:id,
      estado_usuario:estado_usuario
    }


    Swal.fire({
      title: `¿${Title} Usuario?`,
      text: "Se cambiara estado del usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2844a4',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, ${Title}!`,
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.user_services.Desabilitar_usuario(user).subscribe(result => {
          this.debouncer.next( true );
          this.alert.success_small(result.msg)
        })
       
      }
    })
  }
}
