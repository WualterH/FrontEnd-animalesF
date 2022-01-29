import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestResponse } from 'src/app/shared/models/request-response.interface';
import { Observable, throwError } from 'rxjs';
import { Encuestador, RequestResponseGetAllEncuestador, RequestResponseActualizar } from 'src/app/shared/models/encuestador.interface';


@Injectable({
  providedIn: 'root'
})
export class EncuestadorService {

  constructor(private http:HttpClient,private router: Router,private alert:AlertHelper) { }



  GetAll_encuestadores(): Observable<RequestResponseGetAllEncuestador> {
    return this.http
    .get<RequestResponseGetAllEncuestador >(`${environment.API}/animalesF/encuestador/`)
    .pipe(
      map((res:RequestResponseGetAllEncuestador) =>{          
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }
  

  Create_encuestador(encuestador:Encuestador): Observable<RequestResponse> {      
    return this.http
    .post<RequestResponse >(`${environment.API}/animalesF/encuestador/crear`,encuestador)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Actualizar_encuestador(encuestador:any): Observable<RequestResponseActualizar>  {
    return this.http
    .put<RequestResponseActualizar >(`${environment.API}/animalesF/encuestador/actualizar/${encuestador.id}`,encuestador)
    .pipe(
      map((res:RequestResponseActualizar) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Obtener_encuestador(id:number): Observable<RequestResponse> {
    return this.http
    .get<RequestResponse >(`${environment.API}/animalesF/encuestador/${id}`)
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

  Eliminar_Encuestador(id:number): Observable<RequestResponse> {
    return this.http
    .delete<RequestResponse >(`${environment.API}/animalesF/encuestador/eliminar/${id}`)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

}




