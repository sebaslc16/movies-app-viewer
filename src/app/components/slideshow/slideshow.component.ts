import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  //input para poder recibir informacion desde otro componente
  @Input() movies: Movie[] = [];

  public swiper: Swiper | any;

  constructor(public peliculasService: PeliculasService,
              private router: Router) {  
    
  }

  ngAfterViewInit(): void {

    this.swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,

    });

  }

  ngOnInit(): void {

  }

  onSlideNext() {
    
    this.swiper.slideNext();

  }

  onSlidePrevious() {

    this.swiper.slidePrev();

  }

  detailMovie(movie: Movie) {

    this.router.navigate(['/pelicula', movie.id])

  }

}