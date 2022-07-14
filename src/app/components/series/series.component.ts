import { UserService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Serie, Series } from '../../interfaces/seriespopulares.interface';
import { ToastrService } from 'ngx-toastr';
import { Like } from 'src/app/interfaces/like.interface';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.sass'],
})
export class SeriesComponent implements OnInit {
  userCurrent!: string | null | undefined;
  like!: Like;
  isLogged: boolean = false;
  id!: string;
  listaSeries!: Serie[];
  activoPagina1: boolean = false;
  activoPagina2: boolean = false;
  activoPagina3: boolean = false;
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';

  constructor(
    private seriesServicio: SeriesService,
    private likesServicio: LikesService,
    private toast: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activoPagina1 = true;
    this.mostrarSeriesPagina1();
    this.userCurrent = this.userService.getUserCurrent()?.email;
    this.isLogged = this.userService.isLogged;
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

  /**
   * Añade un like de la pelicula
   * @param name nombre de la pelicula
   * @param id id de la pelicula
   */
  addLike(name: string, id: number) {
    if (!this.isLogged) {
      this.toast.info('Es necesario iniciar sesión');
    } else {
      this.id = id.toString();
      this.like = { id: id, name: name };
      this.likesServicio
        .addLike(this.like, this.id, this.userCurrent)
        .then((data) => {
          this.toast.success(`${name} añadido a la lista`);
        })
        .catch((error) => {
          this.toast.error('Intentelo de nuevo más tarde');
        });
    }
  }
}
