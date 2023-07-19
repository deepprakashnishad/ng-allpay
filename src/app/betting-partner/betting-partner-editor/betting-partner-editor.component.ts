import { 
  Component, 
  OnInit, 
  Inject
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BettingPartnerService} from './../betting-partner.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../../environments/environment';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import { BettingPartner } from './../betting-partner';

@Component({
  selector: 'app-betting-partner-editor',
  templateUrl: './betting-partner-editor.component.html',
  styleUrls: ['./betting-partner-editor.component.scss']
})
export class BettingPartnerEditorComponent implements OnInit {

  bettingpartner: BettingPartner;

  constructor(
    private mService: BettingPartnerService,
    private _bottomSheetRef: MatBottomSheetRef<BettingPartnerEditorComponent>,
    private notifier: NotifierService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ){
  	if(!this.bettingpartner){
    	this.bettingpartner = new BettingPartner();
    }

    if(data){
    	this.bettingpartner = data;
    }
  }

  ngOnInit() {
    
  }

  save(){
    if(this.bettingpartner.id){
    	this.mService.update(this.bettingpartner).subscribe(result=>{
    		this.bettingpartner= result;
        this._bottomSheetRef.dismiss(this.bettingpartner);
    	});
    }else{
    	this.mService.add(this.bettingpartner).subscribe(result=>{
    		this.bettingpartner = result;
        this._bottomSheetRef.dismiss(this.bettingpartner);
    	});
    }
  }
}