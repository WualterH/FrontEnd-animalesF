import { Component, OnDestroy, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Encuestador } from 'src/app/shared/models/encuestador.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncuestadorService } from 'src/app/pages/services/encuestador.service';

@Component({
  selector: 'app-lista-encuestador',
  templateUrl: './lista-encuestador.component.html',
  styleUrls: ['./lista-encuestador.component.css']
})
export class ListaEncuestadorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  @Input() encuestadores_List: Encuestador[] = [];
  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();
  debouncer: Subject<boolean> = new Subject();

  update_encuestadores: Encuestador = {
    id: 0,
    nombre: ""
  };

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource = new MatTableDataSource<Encuestador>(this.encuestadores_List);

  constructor(
    private alert: AlertHelper,
    private modalService: NgbModal,
    private encuestadorService: EncuestadorService,
  ) { }


  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(valor => {
        this.onDebounce.emit(valor);
      });
  }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.encuestadores_List != undefined) {
      if (!changes.encuestadores_List.firstChange) {
        this.dataSource = new MatTableDataSource<Encuestador>(this.encuestadores_List);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    }
  }

  open(content: any, id: any) {
    this.update_encuestadores.id = id
    this.encuestadorService.Obtener_encuestador(id).subscribe(res => {
      this.update_encuestadores.nombre = res.data.nombre;
    })

    this.limpiar_encuestadores();
    this.modalService.open(content);

  }

  limpiar_encuestadores() {
    this.update_encuestadores.nombre = ""
  }

  Actualizar_Encuestadores() {
    if (this.update_encuestadores.nombre.trim().length == 0) {
      this.alert.error_small('Los campos no pueden estar vacios.')
      return
    }

    this.encuestadorService.Actualizar_encuestador(this.update_encuestadores).subscribe(res => {
      if (res.success == true) {
        this.alert.success_small(res.msg!)
        this.modalService.dismissAll();
        this.limpiar_encuestadores();
        this.debouncer.next(true);
      } else {
        this.alert.error_small(res.msg!)
      }
    })


  }

  Eliminar_Encuestador(content: any, id: any) {
    this.encuestadorService.Eliminar_Encuestador(id).subscribe(res => {
      if (res.success == true) {
        this.alert.success_small(res.msg!)
        this.debouncer.next(true);
      } else {
        this.alert.error_small(res.msg!)
      }
    })
  }
  ngOnDestroy(): void {
   
  }

}
