import { Component, OnInit } from '@angular/core';
import { PermisoService } from 'src/app/pages/services/permisos.service';
import { Permiso } from 'src/app/shared/models/permisos.interface';

@Component({
  selector: 'app-main-permisos',
  templateUrl: './main-permisos.component.html',
  styleUrls: ['./main-permisos.component.css']
})
export class MainPermisosComponent implements OnInit {

  permisos:Permiso[] =[];

  constructor(
    private permisos_services:PermisoService
  ) { }

  ngOnInit(): void {
    
    this.permisos_services.GetAll_permisos().subscribe(res=>{
      this.permisos=res.data
    })
  }

  actualizarTabla(event:boolean){
    this.permisos_services.GetAll_permisos().subscribe(res=>{
      this.permisos=res.data
    })
  }
}
