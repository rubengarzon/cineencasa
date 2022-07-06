import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SeriesComponent } from './components/series/series.component';
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { SerieComponent } from './components/series/serie/serie.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'peliculas',
    component: PeliculasComponent,
    //...canActivate(() => redirectUnauthorizedTo(['/register'])),
  },
  { path: 'series', component: SeriesComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'serie/:id', component: SerieComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '**', redirectTo: '/peliculas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
