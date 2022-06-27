import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Series } from '../modelos/seriespopulares.interface';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  url: string =
    'https://api.themoviedb.org/3/tv/popular?api_key=7d6cebd7375363a80d7b3517c7036ba6&language=es-ES&page=1';

  constructor(private http: HttpClient) {}

  obtenerSeriesPopulares(): Observable<Series> {
    return this.http.get<Series>(this.url);
  }
}
