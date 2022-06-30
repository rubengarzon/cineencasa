import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { SeriesComponent } from './componentes/series/series.component';
import { PeliculaComponent } from './componentes/peliculas/pelicula/pelicula.component';

const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'pelicula/:id', component: PeliculaComponent},
  { path: '**', redirectTo: '/peliculas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
