import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Pelicula,
  PeliculaObject,
} from '../modelos/ultimaspeliculas.interface';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  apiUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES';

  constructor(private http: HttpClient) {}

  obtenerUltimasPeliculas() {
    return this.http.get<PeliculaObject>(this.apiUrl);
  }
}
