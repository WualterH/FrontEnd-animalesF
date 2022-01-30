import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';

@Component({
  selector: 'app-main-encuesta',
  templateUrl: './main-encuesta.component.html',
  styleUrls: ['./main-encuesta.component.css']
})
export class MainEncuestaComponent implements OnInit {

  encuestas: Encuesta[] = [];
  encuestador: Encuesta[] = [];    
  idEncuestador: any;

  constructor(
    private encuestaServide: EncuestaService,
  ) { }

  ngOnInit(): void {
    this.idEncuestador = localStorage.getItem('idEncuestador');                      
    this.encuestaServide.GetAll_encuestaPorId(this.idEncuestador).subscribe(
      (res) => {                                  
        this.encuestas = res.data;
      });                  
    }    

  actualizarTabla(event:boolean){
    this.encuestaServide.GetAll_encuestaPorId(this.idEncuestador).subscribe(res=>{          
      this.encuestas=res.data
    })
  }

}
