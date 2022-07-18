import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  urlProfilePicture!: string;
  username!: string;
  userCurrent!: string | null | undefined;
  flag: boolean = false;
  isLogged: boolean = false;
  dropdown = document.querySelector('.dropdown');

  constructor(private userServicio: UserService) {}

  ngOnInit(): void {
    this.isLogged = this.userServicio.isLogged;
    this.userCurrent = this.userServicio.getUserCurrent()?.email;
    this.userServicio.getProfile(this.userCurrent).subscribe((data) => {
      this.urlProfilePicture = data[0].url;
      this.username = data[0].usuario;
    });
  }
  /**
   * Cierra sesión el usuario
   */
  cerrarSesion(): void {
    this.userServicio
      .logout()
      .then(() => {
        this.userServicio.isLogged = false;
        this.isLogged = this.userServicio.isLogged;
      })
      .catch((error) => console.log(error));
  }
  /**
   * Abre el dropdown
   */
  openDrop(): void {
    if (this.flag == true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }
}
