import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { SeriesComponent } from './components/series/series.component';
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { SerieComponent } from './components/series/serie/serie.component';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    MenuComponent,
    SeriesComponent,
    PeliculaComponent,
    SerieComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
