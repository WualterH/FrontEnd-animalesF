import { Component,EventEmitter,Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Permiso } from 'src/app/shared/models/permisos.interface';


@Component({
  selector: 'app-lista-permisos',
  templateUrl: './lista-permisos.component.html',
  styleUrls: ['./lista-permisos.component.css']
})
export class ListaPermisosComponent implements OnInit {

  @Input() Permisos_List:Permiso[]=[];
  @Output() onDebounce: EventEmitter<boolean> = new EventEmitter();
  debouncer: Subject<boolean> = new Subject();

  displayedColumns: string[] = ['id', 'nombre','descripcion','actions'];
  dataSource = new MatTableDataSource<Permiso>(this.Permisos_List);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
      this.debouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }

    ngOnChanges(changes: SimpleChanges) {

    if(changes.Permisos_List!=undefined){
      if (!changes.Permisos_List.firstChange) {
        this.dataSource = new MatTableDataSource<Permiso>(this.Permisos_List);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }





}
