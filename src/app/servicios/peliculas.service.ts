import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  apiUrl =
    'https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US';

  constructor(private http: HttpClient) {}

  obtenerUltimasPeliculas() {
    return this.http.get<>(this.apiUrl);
  }
}
