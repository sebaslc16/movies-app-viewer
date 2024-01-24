//location permite controlar todo lo relacionado con la localizacion
//del usuario en la pagina
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movieDetail: MovieResponse | any;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;
    // this.peliculasService.getCast(id);

    //combineLatest sirve para combinar observables
    combineLatest([

      //observables!!

      //servicio para pedir toda la informacion de la pelicula
      //seleccionada
      this.peliculasService.getPeliculaDetalle(id),
      //servicio para obtener la informacion del cast
      this.peliculasService.getCast(id)

      //desestructuracion de los datos que se recibe de los
      //observables, esto se realiza segun el orden en que 
      //se hayan llamado los observables anteriormente
    ]).subscribe( ([movie, cast]) => {

      //si el id de la pelicula no existe se redirecciona al home
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      //si existe se pasa todos los datos de la pelicula a la
      //variable movieDetail para mostrar estos datos en el html
      this.movieDetail = movie;
      
      //recibe toda la informacion del cast y la guarda en la
      //variable para mostrar la data en el html y ademas
      //se utiliza un filtro para mostrar solamente a los actores
      //que tengan imagen
      this.cast = cast.filter((actor) => actor.profile_path !== null);
    });
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  onRegresar() {

    //back para regresar a la pantalla anterior en la que estuvo el usuario
    this.location.back();

  }

}
