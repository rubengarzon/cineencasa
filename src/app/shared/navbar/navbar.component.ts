import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  filter,
  map,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { UserService } from '../../services/auth.service';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  inputSearch = new FormControl('');
  urlProfilePicture: string = "../../../assets/profile.png";
  username!: string;
  userCurrent!: string | null | undefined;
  flag: boolean = false;
  isLogged: boolean = false;
  dropdown = document.querySelector('.dropdown');

  constructor(
    private userServicio: UserService,
    private peliculasSvc: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onSearch();
    this.isLogged = this.userServicio.isLogged;
    this.userCurrent = this.userServicio.getUserCurrent()?.email;
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
  /**
   * Guarda el valor de la barra de busqueda en el servicio peliculasSvc
   */
  onSearch(): void {
    this.inputSearch.valueChanges
      .pipe(
        map((search: string) => search.trim()),
        debounceTime(500),
        distinctUntilChanged(),
        filter((search: string) => search !== ''),
        tap((search: string) => {
          this.peliculasSvc.query = search.replace(' ', '-');
        })
      )
      .subscribe();
  }
  /**
   * Redirige a la pagina search y guarda el resultado de la busqueda
   */
  onEnter(): void {
    if (this.peliculasSvc.query != '') {
      this.peliculasSvc.search(this.peliculasSvc.query).subscribe((data) => {
        this.peliculasSvc.resultSearch = data.results;
      });
      this.router.navigate([`/search/${this.peliculasSvc.query}`]);
    } else {
      console.log('No has escrito nada en el buscador');
    }
  }
}
