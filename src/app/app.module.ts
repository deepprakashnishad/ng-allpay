import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import {SharedModule} from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { NavigationComponent } from './navigation/navigation.component';
import { environment } from '../environments/environment';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AdminModule } from './admin/admin.module';
import { PersonModule } from './person/person.module';
// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './static-page/about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './static-page/faq/faq.component';
import { ContactUsComponent } from './static-page/contact-us/contact-us.component';
import { PrivacyComponent } from './static-page/privacy/privacy.component';
import { DailyReportComponent } from './reports/daily-report/daily-report.component';
import { MerchantComponent } from './merchant/merchant.component';
import { MerchantEditorComponent } from './merchant/merchant-editor/merchant-editor.component';
import { BettingPartnerComponent } from './betting-partner/betting-partner.component';
import { BettingPartnerEditorComponent } from './betting-partner/betting-partner-editor/betting-partner-editor.component';
import { GatewayComponent } from './gateway/gateway.component';
import { GatewayEditorComponent } from './gateway/gateway-editor/gateway-editor.component';
import { ReportComponent } from './reports/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const notifierDefaultOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "right",
          distance: 12
      },
      vertical: {
          position: "bottom",
          distance: 12,
          gap: 10
      }
  },
  theme: "material",
  behaviour: {
      autoHide: 3000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          preset: "slide",
          speed: 300,
          easing: "ease"
      },
      hide: {
          preset: "fade",
          speed: 1000,
          easing: "ease",
      },
      shift: {
          speed: 300,
          easing: "ease"
      },
      overlap: 150
  }
};

@NgModule({
  declarations: [				
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ProfileComponent,
    AboutUsComponent,
    FaqComponent,
    ContactUsComponent,
    PrivacyComponent,
    DailyReportComponent,
    MerchantComponent,
    MerchantEditorComponent,
    GatewayComponent,
    GatewayEditorComponent,
    ReportComponent,
    DashboardComponent,
    BettingPartnerComponent,
    BettingPartnerEditorComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AuthenticationModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    AppRoutingModule,
    AdminModule,
    PersonModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectId),
    AngularFireStorageModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    httpInterceptorProviders, AngularFireAuth, 
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
