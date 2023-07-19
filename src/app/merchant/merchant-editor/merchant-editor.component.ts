import { 
  Component, 
  OnInit, 
  Inject
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MerchantService} from './../merchant.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../../environments/environment';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import { Merchant } from './../merchant';

@Component({
  selector: 'app-merchant-editor',
  templateUrl: './merchant-editor.component.html',
  styleUrls: ['./merchant-editor.component.scss']
})
export class MerchantEditorComponent implements OnInit {

  merchant: Merchant;

  constructor(
    private mService: MerchantService,
    private _bottomSheetRef: MatBottomSheetRef<MerchantEditorComponent>,
    private notifier: NotifierService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ){
  	if(!this.merchant){
    	this.merchant = new Merchant();
    }

    if(data){
    	this.merchant = data;
    }
  }

  ngOnInit() {
    
  }

  save(){
    if(this.merchant.id){
    	this.mService.update(this.merchant).subscribe(result=>{
    		this.merchant= result;
        this._bottomSheetRef.dismiss(this.merchant);
    	});
    }else{
    	this.mService.add(this.merchant).subscribe(result=>{
    		this.merchant = result;
        this._bottomSheetRef.dismiss(this.merchant);
    	});
    }
  }
}