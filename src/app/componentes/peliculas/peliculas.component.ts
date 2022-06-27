import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/modelos/ultimaspeliculas.interface';
import { PeliculasService } from '../../servicios/peliculas.service';
import { PeliculaObject } from '../../modelos/ultimaspeliculas.interface';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.sass'],
})
export class PeliculasComponent implements OnInit {
  listaPeliculas!: Pelicula[];
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';
  constructor(private peliculasServicio: PeliculasService) {}

  ngOnInit(): void {
    this.mostrarPeliculasPagina1();
  }

  mostrarPeliculasPagina1() {
    this.peliculasServicio
      .obtenerPeliculasPopulares()
      .subscribe((data: PeliculaObject) => {
        this.listaPeliculas = data.results;
      });
  }

  mostrarPeliculasPagina2() {
    this.peliculasServicio
      .obtenerPeliculasPopularesPagina2()
      .subscribe((data: PeliculaObject) => {
        this.listaPeliculas = [];
        this.listaPeliculas = data.results;
      });
  }

  mostrarPeliculasPagina3() {
    this.peliculasServicio
      .obtenerPeliculasPopularesPagina3()
      .subscribe((data: PeliculaObject) => {
        this.listaPeliculas = [];
        this.listaPeliculas = data.results;
      });
  }
}
