import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';
//import { Chart } from 'chart.js';
import html2canvas from 'html2canvas'
import Chart from 'chart.js/auto'


@Component({
  selector: 'app-resultado-encuestas',
  templateUrl: './resultado-encuestas.component.html',
  styleUrls: ['./resultado-encuestas.component.css']
})
export class ResultadoEncuestasComponent implements OnInit {

  encuestas: Encuesta[] = [];
  encuestador: Encuesta[] = [];    
  idEncuestador: any;
  Utils: any;
  chart: any;
  fecha: Date[] = [];
  nombreUsuario: any;
  animales: any[] = [];
  
  
  
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
    this.encuestaServide.GetAll_encuestaPorId(this.idEncuestador).subscribe(
      (res) => {         
        this.encuestas = res.data;
        this.contEncuesta = res.data.length;
        this.encuestas.map((element) => {
          if(element.animal=="PERRO"){
            this.favorito = this.favorito + 1;            
          }
        })
        this.animales.push({animal:this.favorito});        
        // console.log("animales", this.animales);
        // console.log("perro", this.favorito);              
      });       
      //this.totalEncuestas();
      this.encuestasPorAnimal();
    }    

  actualizarTabla(event:boolean){
    this.encuestaServide.GetAll_encuestaPorId(this.idEncuestador).subscribe(res=>{          
      this.encuestas=res.data
    })
  }
  

 

  totalEncuestas() {    
  //   if (this.cont != 0) {
  //     this.chart.destroy();
  //   }
    this._cdref.detectChanges()
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {        
        labels: this.fecha,
        datasets: [
          {
            label: 'Ingresos',
            backgroundColor: ['#f2829b'],            
            data: [65, 59, 80, 81, 56, 55, 40],            
          }
        ]
      },
      
    });
  }
  encuestasPorAnimal() {    
    const data = {
      //labels: this.animales,
      labels: [
        'Perro',
        'Gato',
        'Caballo',
        'Conejo',
        'Loro',
        'Hasmter',
        'Tigre'
      ],
      datasets: [
      //   {
      //   label: 'Perro',
      //   data: [65, 59, 90, 81, 56, 55, 40],
      //   fill: true,
      //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
      //   borderColor: 'rgb(255, 99, 132)',
      //   pointBackgroundColor: 'rgb(255, 99, 132)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgb(255, 99, 132)'
      // }, 
      {
        label: 'Animales',
        //data: this.animales,
        data: [this.favorito, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
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
      type: 'radar',
        data: data,
        options: {
          //responsive: false,                
          
        }
      
    });
  }

}
