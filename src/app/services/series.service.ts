import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Series } from '../interfaces/seriespopulares.interface';
import { TV } from '../interfaces/serie.interface';
import { Plataforma } from '../interfaces/plataforma.interface';
import { Videos } from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  url: string =
    'https://api.themoviedb.org/3/tv/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES&page=1';
  url2: string =
    'https://api.themoviedb.org/3/tv/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES&page=2';
  url3: string =
    'https://api.themoviedb.org/3/tv/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES&page=3';
  url4: string = '';
  urlObtenerPlataforma: string = '';
  urlObtenerVideos: string = '';

  constructor(private http: HttpClient) {}

  obtenerSeriesPopularesPagina1(): Observable<Series> {
    return this.http.get<Series>(this.url);
  }
  obtenerSeriesPopularesPagina2(): Observable<Series> {
    return this.http.get<Series>(this.url2);
  }
  obtenerSeriesPopularesPagina3(): Observable<Series> {
    return this.http.get<Series>(this.url3);
  }
  /**
   * Obtiene el detalle de una serie
   * @param tv_id string
   * @returns Observable<Serie>
   */
  obtenerDetalleSerie(tv_id: string): Observable<TV> {
    this.url4 = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES`;
    return this.http.get<TV>(this.url4);
  }
  /**
   * Obtener la plataforma streaming de una serie
   * @param id string
   * @returns observable<Plataforma>
   */
  obtenerPlataforma(id: string): Observable<Plataforma> {
    this.urlObtenerPlataforma = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=7d6cebd7375363a80d7b3517c7036ba6&`;
    return this.http.get<Plataforma>(this.urlObtenerPlataforma);
  }
  /**
   * Obtener trailer de la serie
   * @param id string
   * @returns observable<Videos>
   */
  obtenerVideos(id: string): Observable<Videos> {
    this.urlObtenerVideos = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES`;
    return this.http.get<Videos>(this.urlObtenerVideos);
  }
}
