import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {PersonRoutingModule} from './person-routing/person-routing.module';
import {SharedModule} from './../shared/shared.module';
import {PersonService} from './person.service';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PersonListComponent } from './person-list/person-list.component';

@NgModule({
  declarations: [
    PersonAddEditComponent,  
    ResetPasswordComponent,
    PersonListComponent
  ],
  imports: [
    SharedModule,
    PersonRoutingModule,
  ],
  entryComponents:[PersonAddEditComponent, ResetPasswordComponent],
  providers:[PersonService],
  exports: []
})
export class PersonModule { }
