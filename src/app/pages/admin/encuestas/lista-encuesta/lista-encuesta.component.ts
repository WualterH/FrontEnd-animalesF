import { Component,EventEmitter,Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EncuestaService } from 'src/app/pages/services/encuestas.service';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Encuesta } from 'src/app/shared/models/encuestas.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-encuesta',
  templateUrl: './lista-encuesta.component.html',
  styleUrls: ['./lista-encuesta.component.css']
})
export class ListaEncuestaComponent implements OnInit {

  @Input() encuestas_List!:Encuesta[];  
  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();
  debouncer: Subject<boolean> = new Subject();

  update_encuestas: Encuesta = {
    id:0,
    nombre:"",
    apellido:"",
    animal:"",
    encuestador:"",    
    idEncuestador:0,    
  };

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'animal', 'actions'];
  dataSource = new MatTableDataSource<Encuesta>(this.encuestas_List);  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alert:AlertHelper,
    private modalService: NgbModal,
    private encuestaService: EncuestaService,     
  ) { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(500))
    .subscribe( valor => {
      this.onDebounce.emit( valor );
    });    
}

  ngOnChanges(changes: SimpleChanges) {    
  if(changes.encuestas_List!=undefined){
    if (!changes.encuestas_List.firstChange) {
      this.dataSource = new MatTableDataSource<Encuesta>(this.encuestas_List);            
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}



open(content:any,id:number) {
  this.update_encuestas.id=id
  this.encuestaService.Obtener_encuesta(id).subscribe(res =>{    
    this.update_encuestas.nombre=res.data.nombre;
    this.update_encuestas.apellido=res.data.apellido;
    this.update_encuestas.animal=res.data.animal;
    this.update_encuestas.encuestador=res.data.encuestador;    
  })
  this.limpiar_encuestas();
  this.modalService.open(content);

}

limpiar_encuestas(){
  this.update_encuestas.nombre="";
  this.update_encuestas.apellido="";
  this.update_encuestas.animal="";
  this.update_encuestas.encuestador="";  
}

Actualizar_Encuesta(){  
  if(this.update_encuestas.nombre.trim().length==0){
    this.alert.error_small('Los campos no pueden estar vacios.')
    return
  }
  
  this.encuestaService.Actualizar_encuesta(this.update_encuestas).subscribe(res =>{
    if (res.success==true) {
          this.alert.success_small(res.msg!)
          this.modalService.dismissAll();
          this.limpiar_encuestas();
          this.debouncer.next( true );
        }else{
          this.alert.error_small(res.msg!)
        }
  })

  
}

Eliminar_Encuesta(content:any,id:number){
  this.encuestaService.Eliminar_encuesta(id).subscribe(res =>{
    if (res.success==true) {
          this.alert.success_small(res.msg!)
          this.debouncer.next( true );
        }else{
          this.alert.error_small(res.msg!)
        }
  })    
}

}
