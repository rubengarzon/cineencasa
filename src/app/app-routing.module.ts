import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SeriesComponent } from './components/series/series.component';
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { SerieComponent } from './components/series/serie/serie.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {
  AuthGuard,
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { MyListComponent } from './components/my-list/my-list.component';
import { PermissionsGuard } from './permissions.guard';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'movies',
    component: PeliculasComponent,
  },
  {
    path: 'my-list',
    canActivate: [PermissionsGuard],
    component: MyListComponent,
  },
  { path: 'search/:search', component: SearchComponent },
  { path: 'tvs', component: SeriesComponent },
  { path: 'movie/:id', component: PeliculaComponent },
  { path: 'tv/:id', component: SerieComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
