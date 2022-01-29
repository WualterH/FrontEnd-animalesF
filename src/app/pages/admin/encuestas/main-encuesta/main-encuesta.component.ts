import { Component, OnInit } from '@angular/core';
import { EncuestadorService } from 'src/app/pages/services/encuestador.service';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { Encuestador } from 'src/app/shared/models/encuestador.interface';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';

@Component({
  selector: 'app-main-encuesta',
  templateUrl: './main-encuesta.component.html',
  styleUrls: ['./main-encuesta.component.css']
})
export class MainEncuestaComponent implements OnInit {

  encuestas: Encuesta[] = [];
  list_encuestadores_main: Encuestador[] = [];
  encuestadores : any[] = [];

  constructor(
    private encuestaServide: EncuestaService,
    private encuestadorService: EncuestadorService
  ) { }

  ngOnInit(): void {
    this.encuestaServide.GetAll_encuestaE().subscribe(
      (res) => {                     
        this.encuestas = res.data;                
      });
              
      this.encuestadorService.GetAll_encuestadores().subscribe(
        (res) => {                           
          this.list_encuestadores_main = res.data;          
        }
      );                  
    }    
    

  actualizarTabla(event:boolean){
    this.encuestaServide.GetAll_encuestaE().subscribe(res=>{          
      this.encuestas=res.data
    })
  }

}
