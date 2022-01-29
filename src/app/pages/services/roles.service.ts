import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestResponse } from 'src/app/shared/models/request-response.interface';
import { Observable, throwError } from 'rxjs';
import { RequestResponseActualizar, RequestResponseGetAllRoles, Roles } from 'src/app/shared/models/roles.interface';
import { RequestResponseDesabilitar } from 'src/app/shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient,private router: Router,private alert:AlertHelper) { }



  GetAll_roles(): Observable<RequestResponseGetAllRoles> | any {
    return this.http
    .get<RequestResponseGetAllRoles >(`${environment.API}/animalesF/rol/`)
    .pipe(
      map((res:RequestResponseGetAllRoles) =>{
        return res.data;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }


  Create_roles(roles:Roles): Observable<RequestResponse> {
    return this.http
    .post<RequestResponse >(`${environment.API}/animalesF/rol/crear`,roles)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Desabilitar_Habilitar_rol(rol:any): Observable<RequestResponseDesabilitar>  {
    return this.http
    .put<RequestResponseDesabilitar >(`${environment.API}/animalesF/rol/actualizar/${rol.id}`,rol)
    .pipe(
      map((res:RequestResponseDesabilitar) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

    Actualizar_rol(rol:any): Observable<RequestResponseActualizar>  {
    return this.http
    .put<RequestResponseActualizar >(`${environment.API}/animalesF/rol/actualizar/${rol.id}`,rol)
    .pipe(
      map((res:RequestResponseActualizar) =>{
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




