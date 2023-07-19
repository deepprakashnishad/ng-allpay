import { 
  Component, 
  OnInit, 
  Inject
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GatewayService} from './../gateway.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../../environments/environment';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import { Gateway } from './../gateway';

@Component({
  selector: 'app-gateway-editor',
  templateUrl: './gateway-editor.component.html',
  styleUrls: ['./gateway-editor.component.scss']
})
export class GatewayEditorComponent implements OnInit {

  gateway: Gateway;

  constructor(
    private gService: GatewayService,
    private _bottomSheetRef: MatBottomSheetRef<GatewayEditorComponent>,
    private notifier: NotifierService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ){
  	if(!this.gateway){
    	this.gateway = new Gateway();
    }

    if(data){
    	this.gateway = data;
    }
  }

  ngOnInit() {
    
  }

  save(){
    if(this.gateway.id){
    	this.gService.update(this.gateway).subscribe(result=>{
    		this.gateway= result;
        this._bottomSheetRef.dismiss(this.gateway);
    	});
    }else{
    	this.gService.add(this.gateway).subscribe(result=>{
    		this.gateway = result;
        this._bottomSheetRef.dismiss(this.gateway);
    	});
    }
  }
}