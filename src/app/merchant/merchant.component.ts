import { 
  Component, 
  OnInit, 
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MerchantService} from './merchant.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../environments/environment';
import { MerchantEditorComponent } from './merchant-editor/merchant-editor.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Merchant} from './merchant';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {

  merchants: Array<Merchant> = [];

  constructor(
    private mService: MerchantService,
    private _bottomSheet: MatBottomSheet,
    private notifier: NotifierService 
  ){

  }

  ngOnInit() {
    this.fetchMerchant();
  }

  fetchMerchant(){
    this.mService.get().subscribe(results=>{
      this.merchants = results;
    });
  }

  openMerchantEditor(merchant: Merchant, index: number = -1){
    const bottomSheet = this._bottomSheet.open(MerchantEditorComponent, {data: merchant});
    bottomSheet.afterDismissed().subscribe(result=>{
      console.log(result);
      if(result.id){
        this.notifier.notify("success", "Merchant details saved successfully");
        console.log(index);
        if(index===-1){
          this.merchants.push(result);
        }else{
          this.merchants[index] = result;  
        }
      }
    });
  }

  deleteMerchant(merchant, i){
    this.mService.delete(merchant.id).subscribe(result=>{
      if(result['success']){
        this.notifier.notify("success", `${merchant.name} deleted successfully`);
        this.merchants.splice(i, 1);
      }
    });
  }
}