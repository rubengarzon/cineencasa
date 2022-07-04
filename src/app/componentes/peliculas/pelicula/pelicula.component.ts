import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { DetallePelicula, Genre } from '../../../modelos/pelicula.interface';
import { Plataforma, Flatrate13 } from '../../../modelos/plataforma.interface';
import { Video } from '../../../modelos/video.interface';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.sass'],
})
export class PeliculaComponent implements OnInit {
  id!: string;
  detallePelicula!: DetallePelicula;
  urlImagen: string = 'https://image.tmdb.org/t/p/original';
  plataforma!: Flatrate13[];
  control: boolean = false;
  video!: Video;
  key: string = '';
  urlYoutube: string = '';
  generos!: Genre[];

  constructor(
    private rutaActiva: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];
    this.peliculasService
      .obtenerPelicula(this.id)
      .subscribe((pelicula: DetallePelicula) => {
        this.detallePelicula = pelicula;
        this.generos = pelicula.genres;
        console.log(this.detallePelicula);
      });
    this.peliculasService
      .obtenerPlataforma(this.id)
      .subscribe((dato: Plataforma) => {
        if (dato.results.ES.flatrate != undefined) {
          this.plataforma = dato.results.ES.flatrate;
          this.control = true;
        } else {
          this.control = false;
        }
      });
    this.peliculasService.obtenerVideos(this.id).subscribe((videos) => {
      this.key = videos.results[0].key;
      this.urlYoutube = `https://www.youtube.com/embed/${this.key}`;
      document.querySelector('iframe')?.setAttribute('src', this.urlYoutube);
    });
  }
}
