import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { JwtHelperService } from '@auth0/angular-jwt';


const helper =new JwtHelperService();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  private subscripcion: Subscription = new Subscription;
  

  
  loginForm= this.Fb.group({
    email_usuario: ['', [Validators.required]],
    clave_usuario:['', [Validators.required]],
  });


 

  constructor( private authService: AuthService, private Fb:FormBuilder,private router:Router,private alert:AlertHelper) { }
  

  ngOnInit(): void {

  }

    ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }



  onLogin():void{
    const formValue =this.loginForm.value;
    const ValidarEmail=this.authService.esEmailValido(formValue.email_usuario)

    if(!ValidarEmail){
      this.alert.error_mail("Formato Email Invalido");
      return;
    }

    this.subscripcion.add(
      this.authService.login(formValue).subscribe((res)=>{
        if (res) {
          const tokeninfo=helper.decodeToken(res.token)

          if (tokeninfo.user.rol="ADMIN") {
            this.router.navigate(['']);
          }
          else if(tokeninfo.user.rol="TRABAJADOR"){
            this.router.navigate(['']);
          }
          console.log("Bienvenido al mejor sistema del GrupoFirma");
        }
      })
    );
  }




}
