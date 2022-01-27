import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { HttpClient } from '@angular/common/http';
import {  RequestResponseDesabilitar, RequestResponseGetAll, Usuario } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { RequestResponse } from 'src/app/shared/models/request-response.interface';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient,private router: Router,private alert:AlertHelper) { }

  Create_usuario(user:Usuario): Observable<RequestResponse> {
    return this.http
    .post<RequestResponse >(`${environment.API}/rrhh/usuario/crear`,user)
    .pipe(
      map((res:RequestResponse) =>{

        return res;

      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  GetAll_usuario(): Observable<RequestResponseGetAll> | any {
    return this.http
    .get<RequestResponseGetAll >(`${environment.API}/rrhh/usuario/`)
    .pipe(
      map((res:RequestResponseGetAll) =>{

        return res.data;

      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Desabilitar_usuario(user:any): Observable<RequestResponseDesabilitar>  {
    return this.http
    .put<RequestResponseDesabilitar >(`${environment.API}/rrhh/usuario/${user.id}`,user)
    .pipe(
      map((res:RequestResponseDesabilitar) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  
  Actualizar_usuario(user:any): Observable<RequestResponseDesabilitar>  {
    return this.http
    .put<RequestResponseDesabilitar >(`${environment.API}/rrhh/usuario/${user.id}`,user)
    .pipe(
      map((res:RequestResponseDesabilitar) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  private handlerError(err: any):Observable<never>{

    let errorMessage = "";
    if (err) {
      errorMessage = `Error: code ${err.error.msg}`;
    }
    this.alert.error_small(err.error.msg);
    return throwError(errorMessage);
  }

}




