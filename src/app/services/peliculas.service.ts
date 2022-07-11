import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Pelicula,
  PeliculaObject,
} from '../interfaces/ultimaspeliculas.interface';
import { Observable } from 'rxjs';
import { DetallePelicula } from '../interfaces/pelicula.interface';
import { Plataforma } from '../interfaces/plataforma.interface';
import { Videos } from '../interfaces/video.interface';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { Like } from '../interfaces/like.interface';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  apiUrl4 = '';
  urlObtenerPlataforma = '';
  urlObtenerVideos = '';

  constructor(private http: HttpClient, private firestore: Firestore) {}
  /**
   * * Obtiene las peliculas populares de la pagina 1
   * @returns observable<PeliculaObject>
   */
  obtenerPeliculasPopulares(): Observable<PeliculaObject> {
    return this.http.get<PeliculaObject>(environment.apiUrls.moviePopularPage1);
  }
  /**
   * * Obtiene las peliculas populares de la pagina 2
   * @returns observable<PeliculaObject>
   */
  obtenerPeliculasPopularesPagina2(): Observable<PeliculaObject> {
    return this.http.get<PeliculaObject>(environment.apiUrls.moviePopularPage2);
  }
  /**
   * * Obtiene las peliculas populares de la pagina 3
   * @returns observable<PeliculaObject>
   */
  obtenerPeliculasPopularesPagina3(): Observable<PeliculaObject> {
    return this.http.get<PeliculaObject>(environment.apiUrls.moviePopularPage3);
  }
  /**
   * * Obtiene los detalles de una pelicula
   * @returns observable<PeliculaObject>
   */
  obtenerPelicula(id: string): Observable<DetallePelicula> {
    this.apiUrl4 = `https://api.themoviedb.org/3/movie/${id}?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES`;
    return this.http.get<DetallePelicula>(this.apiUrl4);
  }
  /**
   * * Obtiene la plataforma streaming de la pelicula
   * @param id de la pelicula
   * @returns observable<Plataforma>
   */
  obtenerPlataforma(id: string): Observable<Plataforma> {
    this.urlObtenerPlataforma = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=7d6cebd7375363a80d7b3517c7036ba6&`;
    return this.http.get<Plataforma>(this.urlObtenerPlataforma);
  }
  /**
   * * Obtiene el trailer de la pelicula
   * @param id de la pelicula
   * @returns observable<Videos>
   */
  obtenerVideos(id: string): Observable<Videos> {
    this.urlObtenerVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES`;
    return this.http.get<Videos>(this.urlObtenerVideos);
  }
  /**
   *  * Añade un like que has dado a una pelicula
   * @param like objeto de tipo Like
   * @param id de la pelicula
   * @param userCurrent email usuario actual
   * @returns promise
   */
  addLike(like: Like, id: string, userCurrent: any) {
    const likeDoc = doc(this.firestore, 'likes', userCurrent, 'likes', id);

    return setDoc(likeDoc, like);
  }
}
