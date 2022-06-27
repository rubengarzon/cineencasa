import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../servicios/series.service';
import { Serie } from '../../modelos/seriespopulares.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.sass'],
})
export class SeriesComponent implements OnInit {
  listaSeries!: Serie[];
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';

  constructor(private seriesServicio: SeriesService) {}

  ngOnInit(): void {
    this.seriesServicio.obtenerSeriesPopulares().subscribe((dato) => {
      this.listaSeries = dato.results;
    });
  }
}
