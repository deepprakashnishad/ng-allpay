import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router'
import {AuthGuardService} from './../../authentication/auth-guard.service'
import { CanDeactivateGuardService } from './../../authentication/can-deactivate-guard.service'

const personRoutes: Routes = [
	
]

@NgModule({
  imports:[
  	RouterModule.forChild(personRoutes)
  ],

  exports:[
  	RouterModule
  ]
})
export class PersonRoutingModule { }
