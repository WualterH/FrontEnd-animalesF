import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private auth_service: AuthService){

  }
  canActivate():Observable<boolean>{

    //este guaerd permite acceder a la ruta seleccionada si no esta logeado
    return this.auth_service.isLogged.pipe(
      take(1),
      map((isLogged: boolean)=>!isLogged)
    );
  }
  
}
