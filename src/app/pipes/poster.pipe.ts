import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  //pipe para controlar cuando no se encuentre una imagen
  //en alguna pelicula, si no se encuentra la pelicula
  //se devolvera una por defecto

  transform(poster: string | any): string {

    if(poster){
      return `http://image.tmdb.org/t/p/w500/${poster}`
    } else {
      return './assets/no-image.jpg';
    }

  }

}
