import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CastDetailResponse } from 'src/app/interfaces/cast-detail-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  public personDetail: CastDetailResponse | any;

  constructor(private activatedRoute:ActivatedRoute,
              private peliculasService: PeliculasService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);

    this.peliculasService.getCastDetail(id).subscribe( cast => {

      if (!cast) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.personDetail = cast;

      console.log(this.personDetail);

    });

  }

  onRegresar() {

    //back para regresar a la pantalla anterior en la que estuvo el usuario
    this.location.back();

  }

}
