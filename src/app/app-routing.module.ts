import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SeriesComponent } from './components/series/series.component';
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { SerieComponent } from './components/series/serie/serie.component';

const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'serie/:id', component: SerieComponent },
  { path: '**', redirectTo: '/peliculas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
