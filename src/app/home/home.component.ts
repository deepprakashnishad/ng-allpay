import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Slide } from "../shared/carousel/carousel.interface";
import { AnimationType } from "../shared/carousel/carousel.animations";
import { CarouselComponent } from "../shared/carousel/carousel.component";
// import { SwiperComponent } from "swiper/angular";
// import SwiperCore, { EffectFlip, Pagination, Navigation, Autoplay, Swiper } from "swiper/core";

// // install Swiper modules
// SwiperCore.use([EffectFlip, Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  navigateTo(url) {
    this.router.navigate([url]);
  }
}
