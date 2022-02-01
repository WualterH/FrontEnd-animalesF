//Modulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './pages/admin/admin.module';
import { UsuariosModule } from './pages/admin/usuarios/usuarios.module';
import { MaterialModule } from './material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Componentes

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

//Servicios

import { AlertHelper } from './shared/components/helpers/alert.helpers';
import { AuthService } from './pages/auth/auth.service';
import { InterceptorsTokenService } from './shared/interceptors/interceptors-token.service';
import { UsuariosService } from './pages/services/usuarios.service';
import { RolesService } from './pages/services/roles.service';
import { RolesModule } from './pages/admin/roles/roles.module';
import { PermisosModule } from './pages/admin/permisos/permisos.module';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { DialogModule } from './pages/admin/dialogs/dialog.module';
import { EncuestaService } from './pages/services/encuestas.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,     
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsuariosModule,
    FlexLayoutModule,
    NgbModule,
    RolesModule,
    PermisosModule,
    FileUploadModule,
    DialogModule,
    FormsModule    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsTokenService, multi: true },
      AuthService,
      AlertHelper,
      UsuariosService,
      RolesService,
      EncuestaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
