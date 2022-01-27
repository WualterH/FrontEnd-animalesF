import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


const helper =new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class InterceptorsTokenService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token=localStorage.getItem('token') || null;
    let request = req;
    if (token) {
      
      const tokeninfo=helper.decodeToken(token)
      request = req.clone({
        setHeaders: {
          "authorization": `Bearer ${token}`, "userat": tokeninfo.user.nombre
        }
      });
    }
    return next.handle(request);
  }
}
