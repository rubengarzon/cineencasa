import { Serie } from './../../../interfaces/seriespopulares.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../../services/series.service';
import { Genre, TV } from '../../../interfaces/serie.interface';
import {
  Flatrate13,
  Plataforma,
} from '../../../interfaces/plataforma.interface';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.sass'],
})
export class SerieComponent implements OnInit {
  id: string = '';
  serie!: TV;
  urlImagen: string = 'https://image.tmdb.org/t/p/original';
  generos!: Genre[];
  plataforma!: Flatrate13[];
  control: boolean = false;
  urlYoutube: string = '';
  key: string = '';

  constructor(
    private ruta: ActivatedRoute,
    private seriesServicio: SeriesService
  ) {}

  ngOnInit(): void {
    this.id = this.ruta.snapshot.params['id'];
    this.seriesServicio.obtenerDetalleSerie(this.id).subscribe((serie: TV) => {
      this.serie = serie;
      this.generos = serie.genres;
    });
    this.seriesServicio
      .obtenerPlataforma(this.id)
      .subscribe((plataforma: Plataforma) => {
        if (plataforma.results.ES.flatrate != undefined) {
          this.plataforma = plataforma.results.ES.flatrate;
          this.control = true;
        } else {
          this.control = false;
        }
      });
    this.seriesServicio.obtenerVideos(this.id).subscribe((videos) => {
      this.key = videos.results[0].key;
      this.urlYoutube = `https://www.youtube.com/embed/${this.key}`;
      document.querySelector('iframe')?.setAttribute('src', this.urlYoutube);
    });
  }
}
