import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { MenuInterface } from './interfaces_sidebar/interfaces_sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  panelOpenState = false;
  isAdmin:string="";
  

  //asignar rutas de menu de administrador

  typesOfOptionsAdmin: MenuInterface[] = [    
    {nombreItem:'Control de Usuarios',icon:'directions_walk',route:"main-usuarios"},
  ];

  //asignar rutas a empleados

  typesOfOptionsEmployed: MenuInterface[] = [
    {nombreItem:'Mi perfil',icon:'menu',route:""},
    {nombreItem:'Mis liquidaciones',icon:'menu',route:""},
    {nombreItem:'Informacion Adicional',icon:'menu',route:""}
  ];
  

  typesOfOptionsMantenedores: MenuInterface[] = [
    {nombreItem:'Roles',icon:'group_add',route:"main-roles"},
    {nombreItem:'Permisos',icon:'compare_arrows',route:"main-permisos"},
    {nombreItem: 'Encuesta', icon:'compare_arrows', route: "main-encuestas"},   
    {nombreItem: 'Estadisticas', icon:'compare_arrows', route: "main-estadisticas"}, 
  ];


  private subscripcion: Subscription = new Subscription;

  constructor(private authService_: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.subscripcion.add(
      this.authService_.isAdmin.subscribe(res=>this.isAdmin = res
    ))
  }

  RedirectFunction(ToRoute:MenuInterface):void{    
    this.router.navigate([`admin/${ToRoute.route}`])
    return
  }


 

}
