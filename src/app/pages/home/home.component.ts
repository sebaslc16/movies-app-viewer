import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  //decorador que escucha al host cada vez que se haga scroll en la ventana
  @HostListener('window:scroll', ['$event'])
  onScrol() {
    
    //constante que tendra el valor del scroll
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    //constante que tendra el maximo tamaño del scroll de la pantalla actual
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max) {

      if(this.peliculasService.cargando){
        return;
      }

      this.peliculasService.getCartelera().subscribe( movies => {
        //push para activar el tap del servicio y asi incrementar el numero de pagina para mostrar las siguientes peliculas
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.peliculasService.getCartelera()
         .subscribe( movies => {
          //  console.log(resp.results);
           this.movies = movies;
           this.moviesSlideShow = movies;
         });
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }

}