import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.sass'],
})
export class SerieComponent implements OnInit {
  constructor(private ruta: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.ruta.snapshot.params['id']);
  }
}
