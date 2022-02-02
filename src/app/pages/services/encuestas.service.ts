import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestResponse } from 'src/app/shared/models/request-response.interface';
import { Observable, throwError } from 'rxjs';
import { Encuesta, RequestResponseGetAllEncuesta, RequestResponseActualizar } from 'src/app/shared/models/encuestas.interface';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http:HttpClient,private router: Router,private alert:AlertHelper) { }



  GetAll_encuestas(): Observable<RequestResponseGetAllEncuesta> {
    return this.http
    .get<RequestResponseGetAllEncuesta >(`${environment.API}/animalesF/encuesta/`)
    .pipe(
      map((res:RequestResponseGetAllEncuesta) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  GetAll_encuesta(): Observable<RequestResponseGetAllEncuesta> {
    return this.http
    .get<RequestResponseGetAllEncuesta >(`${environment.API}/animalesF/encuesta/`)
    .pipe(
      map((res:RequestResponseGetAllEncuesta) =>{          
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  GetAll_encuestaPorId(id:number): Observable<RequestResponseGetAllEncuesta> {
    return this.http
    .get<RequestResponseGetAllEncuesta >(`${environment.API}/animalesF/encuesta/${id}`)
    .pipe(
      map((res:RequestResponseGetAllEncuesta) =>{          
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  GetAll_animal(id:number): Observable<RequestResponseGetAllEncuesta> {
    return this.http
    .get<RequestResponseGetAllEncuesta >(`${environment.API}/animalesF/encuesta/animal/${id}`)
    .pipe(
      map((res:RequestResponseGetAllEncuesta) =>{          
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Create_encuesta(encuesta:Encuesta): Observable<RequestResponse> {                       
    return this.http
    .post<RequestResponse >(`${environment.API}/animalesF/encuesta/crear`,encuesta)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Obtener_encuesta(id:number): Observable<RequestResponse> {
    return this.http
    .get<RequestResponse >(`${environment.API}/animalesF/encuesta/buscar/${id}`)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Eliminar_encuesta(id:number): Observable<RequestResponse> {
    return this.http
    .delete<RequestResponse >(`${environment.API}/animalesF/encuesta/eliminar/${id}`)
    .pipe(
      map((res:RequestResponse) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

  Actualizar_encuesta(encuesta:any): Observable<RequestResponseActualizar>  {
    return this.http
    .put<RequestResponseActualizar >(`${environment.API}/animalesF/encuesta/actualizar/${encuesta.id}`,encuesta)
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
      errorMessage = `Error: ${err.error.msg}`;
    }
    this.alert.error_small(err.error.msg);
    return throwError(errorMessage);
  }

  buscarImagen(url: string) {       
    const extencion = url.split('.');
    const extend = extencion[1];    
    return this.http
      .get(`${environment.API}/animalesF/encuesta/download/${url}`, {
        responseType: 'blob',
      })      
  }

  ingresoGetFiles(fileName: string) {    
    const extencion = fileName.split('.');
    const extend = extencion[1];    
    return this.http
      .get(`${environment.API}/animalesF/encuesta/download/${fileName}`, {
        responseType: 'blob',
      })
      .subscribe((res) => {                
        window.open(window.URL.createObjectURL(res));
      });
  }

}




