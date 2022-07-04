import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Pelicula,
  PeliculaObject,
} from '../modelos/ultimaspeliculas.interface';
import { Observable } from 'rxjs';
import { DetallePelicula } from '../modelos/pelicula.interface';
import { Plataforma } from '../modelos/plataforma.interface';
import { Videos } from '../modelos/video.interface';

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
  apiUrl4 = '';
  urlObtenerPlataforma = '';
  urlObtenerVideos = '';

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

  obtenerPelicula(id: string): Observable<DetallePelicula> {
    this.apiUrl4 = `https://api.themoviedb.org/3/movie/${id}?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES`;
    return this.http.get<DetallePelicula>(this.apiUrl4);
  }

  obtenerPlataforma(id: string): Observable<Plataforma> {
    this.urlObtenerPlataforma = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=7d6cebd7375363a80d7b3517c7036ba6&`;
    return this.http.get<Plataforma>(this.urlObtenerPlataforma);
  }

  obtenerVideos(id: string): Observable<Videos> {
    this.urlObtenerVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES`;
    return this.http.get<Videos>(this.urlObtenerVideos);
  }
}
