import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit,AfterViewInit {

  @Input() cast: Cast[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.2,
      freeMode: true,
      spaceBetween: 15
    });
  }

  getCastDetail(person: Cast){

    this.router.navigate(['/cast', person.id]);

  }

}
