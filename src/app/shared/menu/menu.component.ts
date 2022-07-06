import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private userServicio: UserService) {}

  ngOnInit(): void {
    this.isLogged = this.userServicio.isLogged;
  }

  cerrarSesion() {
    this.userServicio
      .logout()
      .then(() => {
        this.userServicio.isLogged = false;
        this.isLogged = this.userServicio.isLogged;
      })
      .catch((error) => console.log(error));
  }
}
