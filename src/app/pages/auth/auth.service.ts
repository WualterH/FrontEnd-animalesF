import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Role, User, UserResponse } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';

const helper =new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //variables observables para 
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Role>("NULL");
  public NombreUsuario:string="Administrador"

  constructor(private http:HttpClient,private router: Router,private alert:AlertHelper) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get ObtenerNombre():string{
    return this.NombreUsuario;
  }

  get isAdmin():Observable<string>{
    return this.role.asObservable();
  }

  login(authData:User): Observable<UserResponse> {
    return this.http
    .post<UserResponse >(`${environment.API}/animalesF/usuario/login`,authData)
    .pipe(
      map((res:UserResponse) =>{

        const tokeninfo=helper.decodeToken(res.token)
        this.NombreUsuario=tokeninfo.user.nombre

        this.saveToken(res.token)
        this.loggedIn.next(true)
        this.role.next(tokeninfo.user.rol)
        return res
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  logout():void{
    localStorage.removeItem('token')
    this.loggedIn.next(false)
    this.router.navigate(['/login'])
  }

  private checkToken():void{

    let userToken=localStorage.getItem('token') || null;

    if (userToken) {
      
      const isExpired = helper.isTokenExpired(userToken);
      const tokeninfo=helper.decodeToken(userToken)

      if (isExpired) {
        this.logout()
      }else{
        this.loggedIn.next(true);
        this.role.next(tokeninfo.user.rol)
      }
    }
  }

  private saveToken(token:string):void{

    localStorage.setItem('token',token);
  }

  private handlerError(err: any):Observable<never>{

    let errorMessage = "Ha ocurrido un error recibiendo la data";
    if (err) {
      errorMessage = `Error: code ${err.error.msg}`;
    }

    this.alert.error_mail(err.error.msg);
    return throwError(errorMessage);
  }
  
  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';
      
      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
}
