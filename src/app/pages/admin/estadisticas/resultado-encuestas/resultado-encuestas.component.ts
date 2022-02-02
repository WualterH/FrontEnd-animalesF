import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';
//import { Chart } from 'chart.js';
import html2canvas from 'html2canvas'
import Chart from 'chart.js/auto'
import { element } from 'protractor';


@Component({
  selector: 'app-resultado-encuestas',
  templateUrl: './resultado-encuestas.component.html',
  styleUrls: ['./resultado-encuestas.component.css']
})
export class ResultadoEncuestasComponent implements OnInit {

  encuestas: any[] = [];
  datos: any[] = [];    
  idEncuestador: any;
  Utils: any;
  chart: any;
  fecha: Date[] = [];
  nombreUsuario: any;
  total: any;
  animalf: any;
  
  
  
  contEncuesta!: number;
  favorito: number = 0;
  favorito2!: number;
  
  @ViewChild('barChartbarras', { static: false }) private chartRef1!: ElementRef
  @ViewChild('barChart', { static: false }) private chartRef!: ElementRef

  constructor(
    private encuestaServide: EncuestaService,
    private _cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    this.idEncuestador = localStorage.getItem('idEncuestador');                      
    this.encuestaServide.GetAll_animal(this.idEncuestador).subscribe(
      (res) => {                 
        this.encuestas = res.data;
        this.encuestas = Array.from(Object.values(res.data));                
        this.total = this.encuestas[0];
        this.animalf = this.encuestas[1];
        this.datos.push(this.encuestas)        

        var data = {
          labels: [
            'Total Encuestas',
            'Perro',    
          ],
          datasets: [      
          {
            label: 'Encuestas',        
            //data: [20, 48],
             data: [this.total, this.animalf],
            //data: this.encuestas,
            fill: true,
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(54, 162, 235)', 'rgb(255, 159, 64)',],
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }]
        };    
      //   if (this.cont != 0) {
      //     this.chart.destroy();
      //   }
        this._cdref.detectChanges()
        this.chart = new Chart(this.chartRef1.nativeElement, {
          type: 'bar',
            data: data,
            options: {                                  
            }
          
        });
      });             
        
      
    }    


 

}
