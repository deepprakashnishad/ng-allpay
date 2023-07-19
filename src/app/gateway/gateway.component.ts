import { 
  Component, 
  OnInit, 
} from '@angular/core';
import {FormControl} from '@angular/forms';
import { GatewayService } from './gateway.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../environments/environment';
import { GatewayEditorComponent } from './gateway-editor/gateway-editor.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Gateway } from './gateway';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {
  gateways: Array<Gateway> = [];

  constructor(
    private mService: GatewayService,
    private _bottomSheet: MatBottomSheet,
    private notifier: NotifierService 
  ){

  }

  ngOnInit() {
    this.fetchGateway();
  }

  fetchGateway(){
    this.mService.get().subscribe(results=>{
      this.gateways = Gateway.fromJSONArray(results);
    });
  }

  openGatewayEditor(gateway: Gateway, index: number = -1){
    console.log(gateway)
    const bottomSheet = this._bottomSheet.open(GatewayEditorComponent, {data: gateway});
    bottomSheet.afterDismissed().subscribe(result=>{
      console.log(result);
      if(result.id){
        this.notifier.notify("success", "Gateway details saved successfully");
        console.log(index);
        if(index===-1){
          this.gateways.push(result);
        }else{
          this.gateways[index] = result;  
        }
      }
    });
  }

  deleteGateway(gateway, i){
    this.mService.delete(gateway.id).subscribe(result=>{
      if(result['success']){
        this.notifier.notify("success", `${gateway.name} deleted successfully`);
        this.gateways.splice(i, 1);
      }
    });
  }
}