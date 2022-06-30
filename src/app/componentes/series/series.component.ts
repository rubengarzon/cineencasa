import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../servicios/series.service';
import { Serie, Series } from '../../modelos/seriespopulares.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.sass'],
})
export class SeriesComponent implements OnInit {
  listaSeries!: Serie[];
  activoPagina1: boolean = false;
  activoPagina2: boolean = false;
  activoPagina3: boolean = false;
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';

  constructor(private seriesServicio: SeriesService) {}

  ngOnInit(): void {
    this.activoPagina1 = true;
    this.mostrarSeriesPagina1();
  }

  mostrarSeriesPagina1() {
    this.activoPagina2 = false;
    this.activoPagina3 = false;
    this.activoPagina1 = true;
    this.seriesServicio
      .obtenerSeriesPopularesPagina1()
      .subscribe((data: Series) => {
        this.listaSeries = [];
        this.listaSeries = data.results;
      });
  }

  mostrarSeriesPagina2() {
    this.activoPagina1 = false;
    this.activoPagina3 = false;
    this.activoPagina2 = true;
    this.seriesServicio
      .obtenerSeriesPopularesPagina2()
      .subscribe((data: Series) => {
        this.listaSeries = [];
        this.listaSeries = data.results;
      });
  }

  mostrarSeriesPagina3() {
    this.activoPagina1 = false;
    this.activoPagina2 = false;
    this.activoPagina3 = true;
    this.seriesServicio
      .obtenerSeriesPopularesPagina3()
      .subscribe((data: Series) => {
        this.listaSeries = [];
        this.listaSeries = data.results;
      });
  }
}
