import { 
  Component, 
  OnInit, 
} from '@angular/core';
import {FormControl} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from './profile.service';
import { Person } from  './../person/person';
import { environment } from './../../environments/environment';
import { ShareComponent } from './../shared/share/share.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  person: Person = new Person();

  uploadPath: string = "";

  constructor(
    private profileService: ProfileService,
    private _bottomSheet: MatBottomSheet,
    private notifier: NotifierService
  ){

  }

  ngOnInit(){
    this.profileService.getPersonDetail().subscribe(result=>{
      this.person = Person.fromJSON(result);
      
      this.uploadPath = this.person.id;
      
    });
  }

  uploadCompleted(event, type){
    this.profileService.updateProfileImages(event, type).subscribe(result=>{
      if(result['success']){
        this.person[type] = event;
        this.notifier.notify("success", "Update successfull");
      }else{
        this.notifier.notify("error", "Update failed");
      }
    });
  }
}