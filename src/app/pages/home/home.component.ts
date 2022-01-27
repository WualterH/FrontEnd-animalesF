import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],

})

export class HomeComponent implements OnInit {


  constructor(public authService_: AuthService,) { 


  }

  ngOnInit(): void {
  }

}
