import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRolesComponent } from './roles/main-roles/main-roles.component';
import { MainComponent } from './trabajadores/main/main.component';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { MainUsuariosComponent } from './usuarios/main-usuarios/main-usuarios.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MainPermisosComponent } from './permisos/main-permisos/main-permisos.component';
import { PermisosModule } from './permisos/permisos.module';
import { MainEncuestaComponent } from './encuestas/main-encuesta/main-encuesta.component';
import { MainEncuestadorComponent } from './encuestador/main-encuestador/main-encuestador.component';

const routes: Routes = 
[
  { path: 'main-trabajadores', component: MainComponent },
  { path: 'main-usuarios', component: MainUsuariosComponent },
  { path: 'main-roles', component: MainRolesComponent },
  { path: 'main-permisos', component: MainPermisosComponent },
  { path: 'main-encuestas', component: MainEncuestaComponent},
  { path: 'main-encuestador', component: MainEncuestadorComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TrabajadoresModule,
    UsuariosModule,
    PermisosModule
  ],
  exports: [
    RouterModule,
    TrabajadoresModule,
    UsuariosModule,
    PermisosModule
  ]
})
export class AdminRoutingModule { }