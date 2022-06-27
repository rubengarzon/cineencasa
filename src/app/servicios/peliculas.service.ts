import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Pelicula,
  PeliculaObject,
} from '../modelos/ultimaspeliculas.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  apiUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES';
  apiUrl2 =
    'https://api.themoviedb.org/3/movie/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES&page=2';
  apiUrl3 =
    'https://api.themoviedb.org/3/movie/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES&page=3';

  constructor(private http: HttpClient) {}

  obtenerPeliculasPopulares(): Observable<PeliculaObject> {
    return this.http.get<PeliculaObject>(this.apiUrl);
  }

  obtenerPeliculasPopularesPagina2(): Observable<PeliculaObject> {
    return this.http.get<PeliculaObject>(this.apiUrl2);
  }

  obtenerPeliculasPopularesPagina3(): Observable<PeliculaObject> {
    return this.http.get<PeliculaObject>(this.apiUrl3);
  }
}
