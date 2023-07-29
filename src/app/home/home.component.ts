import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Slide } from "../shared/carousel/carousel.interface";
import { AnimationType } from "../shared/carousel/carousel.animations";
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public media: MediaObserver
  ) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    if(this.media.isActive("gt-xs")){
      this.router.navigate(["/dashboard"]);  
    }
  }

  navigateTo(url) {
    this.router.navigate([url]);
  }
}
