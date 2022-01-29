import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestResponse } from 'src/app/shared/models/request-response.interface';
import { Observable, throwError } from 'rxjs';
import { Permiso, RequestResponseGetAllPermiso } from 'src/app/shared/models/permisos.interface';


@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private http:HttpClient,private router: Router,private alert:AlertHelper) { }



  GetAll_permisos(): Observable<RequestResponseGetAllPermiso> {
    return this.http
    .get<RequestResponseGetAllPermiso >(`${environment.API}/animalesF/permiso/`)
    .pipe(
      map((res:RequestResponseGetAllPermiso) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }


  Create_permiso(permiso:Permiso): Observable<RequestResponse> {
    return this.http
    .post<RequestResponse >(`${environment.API}/animalesF/permiso/crear`,permiso)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }




  private handlerError(err: any):Observable<never>{

    let errorMessage = "";
    if (err) {
      errorMessage = `Error: ${err.error.msg}`;
    }
    this.alert.error_small(err.error.msg);
    return throwError(errorMessage);
  }

}




