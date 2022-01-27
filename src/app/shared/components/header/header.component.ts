import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAdmin:boolean|string=false;
  nombreUsuario:string="";
  isLogged:boolean=false;

  private subscripcion: Subscription = new Subscription;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService_: AuthService) { }


  ngOnInit(): void {
    this.subscripcion.add(
      this.authService_.isLogged.subscribe(res=>
        this.isLogged = res
      )
    )

    this.authService_.isAdmin.subscribe(res=>
      this.isAdmin = res
    )

    this.nombreUsuario=this.authService_.ObtenerNombre
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  onToggleSidenav(): void{
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authService_.logout();
  }
}
