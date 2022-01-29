import { Component, OnInit } from '@angular/core';
import { EncuestadorService } from 'src/app/pages/services/encuestador.service';
import { Encuestador } from 'src/app/shared/models/encuestador.interface';

@Component({
  selector: 'app-main-encuestador',
  templateUrl: './main-encuestador.component.html',
  styleUrls: ['./main-encuestador.component.css']
})
export class MainEncuestadorComponent implements OnInit {

  encuestadores:Encuestador[] = [];

  constructor(
    private ciudadService: EncuestadorService
  ) { }

  ngOnInit(): void {
    this.ciudadService.GetAll_encuestadores().subscribe(
      (res) => {
        this.encuestadores = res.data;
        
      }
    );
  }
  
  actualizarTabla(event:boolean){
    this.ciudadService.GetAll_encuestadores().subscribe(res=>{
      this.encuestadores=res.data
    })
  }

}
