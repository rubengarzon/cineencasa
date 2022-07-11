import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/ultimaspeliculas.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculaObject } from '../../interfaces/ultimaspeliculas.interface';
import { UserService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.sass'],
})
export class PeliculasComponent implements OnInit {
  listaPeliculas!: Pelicula[];
  isLogged: boolean = false;
  activoPagina1: boolean = false;
  activoPagina2: boolean = false;
  activoPagina3: boolean = false;
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';
  constructor(
    private peliculasServicio: PeliculasService,
    private userService: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.activoPagina1 = true;
    this.mostrarPeliculasPagina1();
    this.isLogged = this.userService.isLogged;
  }

  mostrarPeliculasPagina1() {
    this.activoPagina2 = false;
    this.activoPagina3 = false;
    this.activoPagina1 = true;
    this.peliculasServicio
      .obtenerPeliculasPopulares()
      .subscribe((data: PeliculaObject) => {
        this.listaPeliculas = data.results;
      });
  }

  mostrarPeliculasPagina2() {
    this.activoPagina1 = false;
    this.activoPagina3 = false;
    this.activoPagina2 = true;
    this.peliculasServicio
      .obtenerPeliculasPopularesPagina2()
      .subscribe((data: PeliculaObject) => {
        this.listaPeliculas = [];
        this.listaPeliculas = data.results;
      });
  }

  mostrarPeliculasPagina3() {
    this.activoPagina1 = false;
    this.activoPagina2 = false;
    this.activoPagina3 = true;
    this.peliculasServicio
      .obtenerPeliculasPopularesPagina3()
      .subscribe((data: PeliculaObject) => {
        this.listaPeliculas = [];
        this.listaPeliculas = data.results;
      });
  }

  addLike() {
    if (!this.isLogged) {
      this.toast.info('Es necesario iniciar sesión');
    }
  }
}
