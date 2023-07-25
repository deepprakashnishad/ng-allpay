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
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-merchant-editor',
  templateUrl: './merchant-editor.component.html',
  styleUrls: ['./merchant-editor.component.scss']
})
export class MerchantEditorComponent implements OnInit {

  merchant: Merchant;
  token: string;

  constructor(
    private mService: MerchantService,
    private _bottomSheetRef: MatBottomSheetRef<MerchantEditorComponent>,
    private notifier: NotifierService,
    private clipboard: Clipboard,
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

  generateToken(){
    this.mService.generateToken(this.merchant.id).subscribe(result=>{
      if(result.success){
        this.token = result.mToken;
        this.clipboard.copy(this.token)
        this.notifier.notify("success", "Token copied to clipboard successfully");
      }else{
        this.notifier.notify("error", "Failed to generate token");
      }
    });
  }
}