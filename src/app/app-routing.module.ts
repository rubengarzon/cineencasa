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

const routes: Routes = [
  {
    path: 'peliculas',
    component: PeliculasComponent,
  },
  {
    path: 'milista',
    canActivate: [PermissionsGuard],
    component: MyListComponent,
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
