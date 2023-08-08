import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './authentication/auth-guard.service';
import {CanDeactivateGuardService} from './authentication/can-deactivate-guard.service';
import { HomeComponent } from './home/home.component';
import { PermissionComponent } from './admin/permission/permission.component';
import { RoleComponent } from './admin/role/role.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { ActivityLogComponent } from './admin/activity-log/activity-log.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { UserReportComponent } from './admin/reports/user-report/user-report.component';
import {AboutUsComponent} from './static-page/about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './static-page/faq/faq.component';
import { PrivacyComponent } from './static-page/privacy/privacy.component';
import { ContactUsComponent } from './static-page/contact-us/contact-us.component';
import { MerchantComponent } from './merchant/merchant.component';
import { GatewayComponent } from './gateway/gateway.component';
import { BettingPartnerComponent } from './betting-partner/betting-partner.component';
import { ReportComponent } from './reports/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DailyReportComponent } from './reports/daily-report/daily-report.component';

const routes: Routes = [
	 {
		path: '', 
		component: HomeComponent,
		data: { title: 'Home', tabname: 'home', permissions: []}
	},	 
	{
		path: 'home', 
		component: HomeComponent,
		data: { title: 'Home', tabname: 'home', permissions: []}
	},
	{
		path: 'merchants', 
		component: MerchantComponent,
		data: { title: 'Merchants', tabname: 'merchants', ed:"test", permissions: []}
	},
	{
		path: 'betting-partner', 
		component: BettingPartnerComponent,
		data: { title: 'BettingPartners', tabname: 'betting-partner', permissions: []}
	},
	{
		path: 'payment-gateways', 
		component: GatewayComponent,
		data: { title: 'Payment Gateway', tabname: 'payment-gateways', permissions: []}
	},
	{
		path: 'reports', 
		component: ReportComponent,
		data: { title: 'Report', tabname: 'reports', permissions: []}
	},
	{
		path: 'dashboard', 
		component: DashboardComponent,
		data: { title: 'Dashboard', tabname: 'dashboard', permissions: []}
	},
	{
		path: 'privacy', 
		component: PrivacyComponent,
		data: { title: 'Privacy', tabname: 'privacy', permissions: []}
	},
	{
		path: 'contact', 
		component: ContactUsComponent,
		data: { title: 'Contact-Us', tabname: 'contact', permissions: []}
	},
	{
		path: 'users', 
		component: PersonListComponent,
		data: { title: 'Users', tabname: 'users', permissions: []}
	},
	
	/* {path: 'person', loadChildren: './person/person.module#PersonModule', canLoad: [AuthGuardService],
		data:{title: 'Person', resources: ['CREATE_PERSON', 'UPDATE_PERSON', 'DELETE_PERSON']}}, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
  	enableTracing: false,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
