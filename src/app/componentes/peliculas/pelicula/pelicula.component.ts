import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { DetallePelicula } from '../../../modelos/pelicula.interface';
import { Plataforma, Flatrate13 } from '../../../modelos/plataforma.interface';

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
  }
}
