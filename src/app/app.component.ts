import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { SwUpdate } from '@angular/service-worker';
import { PwaService } from './pwa.service';
import { AuthenticationService } from './authentication/authentication.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';
  isShowNavigation = true;
  pwa: PwaService;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pwaService: PwaService,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) {
    this.pwa = this.pwaService;
  }

  ngOnInit() {

    this.authenticationService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url.includes('admin')) {
            this.isShowNavigation = false;
          }
          else {
            this.isShowNavigation = true;
          }
        }
      }
    );
  }

  menuSelected(title){
    this.title = title;
  }

  installPwa(): void {
    this.pwaService.promptEvent.prompt();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  scrollToTopFunc(event) {
    var scrollElem= document.querySelector('#moveTop');
    scrollElem.scrollIntoView({ behavior: "smooth"});
  }
}
