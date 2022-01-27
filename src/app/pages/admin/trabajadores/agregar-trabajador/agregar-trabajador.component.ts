import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-agregar-trabajador',
  templateUrl: './agregar-trabajador.component.html',
  styleUrls: ['./agregar-trabajador.component.css']
})
export class AgregarTrabajadorComponent implements OnInit {



  constructor(private modalService: NgbModal) { }

  open(content:any) {
    this.modalService.open(content, { size: 'lg' });

  }






  ngOnInit(): void {
  }

}
