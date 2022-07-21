import { Component, OnInit } from '@angular/core';
import { ResultSearch, Search } from 'src/app/interfaces/search.interface';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  search!: ResultSearch[];
  urlImagen: string = 'https://image.tmdb.org/t/p/original/';

  constructor(public peliculasSvc: PeliculasService) {}

  ngOnInit(): void {}
}
