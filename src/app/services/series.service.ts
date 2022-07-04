import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Series } from '../interfaces/seriespopulares.interface';

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
}
