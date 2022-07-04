import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './componentes/menu/menu.component';
import { SeriesComponent } from './componentes/series/series.component';
import { PeliculaComponent } from './componentes/peliculas/pelicula/pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    MenuComponent,
    SeriesComponent,
    PeliculaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
