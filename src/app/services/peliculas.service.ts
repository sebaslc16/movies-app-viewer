import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

import { tap, map, catchError } from 'rxjs/operators'
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { CastDetailResponse } from '../interfaces/cast-detail-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  //variable para controlar la carga de las peliculas cuando se haga el scroll, para asi
  //prevenir que se hagan multiples llamadas
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  //parametros de la url para las peticiones
  get params() {

    return {
      api_key:'bedfed5e169380d2ccc189bad528a3ca',
      language: 'es-ES',
      //page ira incrementando a medida que se haga scroll para ir mostrando la pagina siguiente de peliculas
      page: this.carteleraPage
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  //peticion para obtener las peliculas en cartelera de la api TMDB
  //devuelve un observable de tipo movie(interface)
  getCartelera():Observable<Movie[]> {

    if(this.cargando){
      //cargando peliculas
      //para devolver un observable vacio mientras se cargan las peliculas y asi evitar hacer multiples llamadas
      return of ([]) ;
    }

    this.cargando =  true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,{
      params: this.params,
    }).pipe(
      map( (resp) => resp.results ),
      //el tap se ejecuta cada vez que el observable emite un valor
      tap(() => {
        //se incrementa el uno la pagina para cargar mas peliculas
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {

    //query: es el string de la pelicula(s) que se quiere buscar
    const params = {...this.params, page: 1, query: texto};

    //https://api.themoviedb.org/3/search/movie

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    )
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits?`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]))
    );
  }

  getCastDetail(id: string): Observable<CastDetailResponse>{

    return this.http.get<CastDetailResponse>(`${this.baseUrl}/person/${id}?`, {
      params: this.params
    });
    
  }
}