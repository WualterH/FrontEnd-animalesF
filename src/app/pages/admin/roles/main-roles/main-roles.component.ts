import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/pages/services/roles.service';
import { Roles } from 'src/app/shared/models/roles.interface';

@Component({
  selector: 'app-main-roles',
  templateUrl: './main-roles.component.html',
  styleUrls: ['./main-roles.component.css']
})
export class MainRolesComponent implements OnInit {

  roles:Roles[]=[]

  constructor(
    private roles_services:RolesService
  ) { }

  ngOnInit(): void {

    this.roles_services.GetAll_roles().subscribe((res: Roles[]) => {
      this.roles=res
    })
  }

  actualizarTabla(event:boolean){
    console.log('Actualizando tabla roles')
    
    this.roles_services.GetAll_roles().subscribe((res: Roles[]) => {
      this.roles=res
      console.log(this.roles)

    })

  }

}
