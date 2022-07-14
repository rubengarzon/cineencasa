import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/ultimaspeliculas.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculaObject } from '../../interfaces/ultimaspeliculas.interface';
import { UserService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Like } from '../../interfaces/like.interface';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.sass'],
})
export class PeliculasComponent implements OnInit {
  userCurrent!: string | null | undefined;
  id!: string;
  like!: Like;
  listaPeliculas!: Pelicula[];
  isLogged: boolean = false;
  activoPagina1: boolean = false;
  activoPagina2: boolean = false;
  activoPagina3: boolean = false;
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';
  constructor(
    private peliculasServicio: PeliculasService,
    private likesServicio: LikesService,
    private userService: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.activoPagina1 = true;
    this.mostrarPeliculasPagina1();
    this.isLogged = this.userService.isLogged;
    this.userCurrent = this.userService.getUserCurrent()?.email;
  }
  /**
   * Muestra las peliculas de la pagina 1
   */
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
  /**
   * Muestra las peliculas de la pagina 2
   */
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
  /**
   * Muestra las peliculas de la pagina 3
   */
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
  /**
   * Añade un like de la pelicula
   * @param name nombre de la pelicula
   * @param id id de la pelicula
   */
  addLike(name: string, id: number) {
    if (!this.isLogged) {
      this.toast.info('Es necesario iniciar sesión');
    } else {
      this.id = id.toString();
      this.like = { id: id, name: name };
      this.likesServicio
        .addLike(this.like, this.id, this.userCurrent)
        .then((data) => {
          this.toast.success(`${name} añadido a la lista`);
        })
        .catch((error) => {
          this.toast.error('Intentelo de nuevo más tarde');
        });
    }
  }
}
