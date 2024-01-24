import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CastComponent } from './pages/cast/cast.component';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'pelicula/:id', component: PeliculaComponent},
  {path: 'cast/:id', component: CastComponent},
  {path: 'buscar/:texto', component: BuscarComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
