import { Serie } from './../../../interfaces/seriespopulares.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../../services/series.service';
import { TV } from '../../../interfaces/serie.interface';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.sass'],
})
export class SerieComponent implements OnInit {
  id: string = '';
  serie!: TV;

  constructor(
    private ruta: ActivatedRoute,
    private seriesServicio: SeriesService
  ) {}

  ngOnInit(): void {
    this.id = this.ruta.snapshot.params['id'];
    this.seriesServicio
      .obtenerDetalleSerie(this.id)
      .subscribe((serie: TV) => {
        this.serie = serie;
      });
  }
}
