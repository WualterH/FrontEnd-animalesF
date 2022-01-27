import { Component,EventEmitter,Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { RolesService } from 'src/app/pages/services/roles.service';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Roles } from 'src/app/shared/models/roles.interface';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {

  @Input() Roles_list: Roles[]=[];
  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();
  
  Update_roles:Roles={
    id:0,
    nombre:"",
    descripcion:"",
    estado:false
  };


  debouncer: Subject<boolean> = new Subject();

  displayedColumns: string[] = ['id', 'nombre','descripcion','estado','actions'];
  dataSource = new MatTableDataSource<Roles>(this.Roles_list);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alert:AlertHelper,  
    private roles_services:RolesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
         this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.Roles_list!=undefined){
      if (!changes.Roles_list.firstChange) {
        this.dataSource = new MatTableDataSource<Roles>(this.Roles_list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  limpiar_roles(){

    this.Update_roles.nombre="",
    this.Update_roles.descripcion="",
    this.Update_roles.estado=false
  }

  Actualizar_Rol(){
  
    if(this.Update_roles.nombre.trim().length==0 || this.Update_roles.descripcion.trim().length==0){
      this.alert.error_small('Los campos no pueden estar vacios.')
      return
    }


    this.roles_services.Actualizar_rol(this.Update_roles).subscribe(res =>{
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

  open(content:any,id:number) {
    this.Update_roles.id=id

    this.limpiar_roles();
    this.modalService.open(content);

  }

  Desabilitar_Habilitar_Rol(id:number,estado:boolean){
    
    let Title=""

    if (estado==true) {
      Title="Habilitar"
    }else{
      Title="Inabilitar"
    }
    const rol={
      id:id,
      estado:estado
    }

    Swal.fire({
      title: `¿${Title} Rol?`,
      text: "Se cambiara estado del rol!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2844a4',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, ${Title}!`,
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.roles_services.Desabilitar_Habilitar_rol(rol).subscribe(res => {
          this.debouncer.next( true );
          this.alert.success_small(res.msg)
        })
      }
    })
  }

}
