import { AfterViewInit, Component, HostListener, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';



@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	animations: [
		trigger('openClose', [
			state('open', style({
          width: '150px',
          opacity: 1,
          display: "block"
      })),
			state('closed', style({
          width: '0px',
          opacity: 0,
          display: "none"
      })),
			transition('open => closed', [
				animate('200ms')
			]),
			transition('closed => open', [
				animate('200ms')
			]),
		])
	]
})
export class NavigationComponent implements OnInit, AfterViewInit {

	isLoggedIn: boolean  = false;
	isSidebarOpen: boolean = false;
	name: String;
	mobile: string;
	@ViewChild("navToolbar") navToolbar;
	isLeftBarOpen: boolean = false;

	selectedTab: string="dashboard";

	private readonly SHRINK_TOP_SCROLL_POSITION = 5;
	shrinkToolbar = false;
  	elementPosition: any;

  	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private storageService: StorageService,
		private titleService: Title,
		private renderer: Renderer2,
		private ngZone: NgZone,
		public media: MediaObserver
    ) {
    }

  ngAfterViewInit() {
  	if(this.media.isActive("xs")){
  		this.isLeftBarOpen = false;
  	}else{
  		this.isLeftBarOpen = true;
  	}
  }

	ngOnInit() {
		this.router.events.subscribe((data) => {
	        if (data instanceof RoutesRecognized) {
	          var title = data.state.root.firstChild.data.title;
	          this.titleService.setTitle(title);
	        }
	    });

		this.authenticationService.isLoggedIn.subscribe(value => {
	      this.isLoggedIn = value;
	      if(value){
	      	this.name = this.authenticationService.getTokenOrOtherStoredData("name");
	      	this.mobile = this.authenticationService.getTokenOrOtherStoredData("mobile");
	      }
    });

    this.renderer.listen('window', 'click', (e: Event)=>{});	
	}

	toggleLoginStatus(isLoggedIn){
		if(isLoggedIn){
			this.isLoggedIn = false;
    		this.authenticationService.logout();
		}else{
			this.router.navigate(['/login']);
		}
	}

  toggleLeftDrawer() {
    this.isLeftBarOpen = !this.isLeftBarOpen;
  }

  navigateTo(url, tabname) {
  	this.selectedTab = tabname;
    this.router.navigate([url]);
    if(this.media.isActive("xs")){
    	this.isLeftBarOpen = false;	
    }
    
  }
}
