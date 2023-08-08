import { Component, OnInit, ViewChild} from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {
  gateways: Array<Gateway> = [];

  displayedColumns: string[] = ['name', 'status','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
      this.dataSource = new MatTableDataSource<any>(this.gateways)
      this.dataSource.sort = this.sort;
    });
  }

  openGatewayEditor(gateway: Gateway, index: number = -1){
    console.log(gateway)
    const bottomSheet = this._bottomSheet.open(GatewayEditorComponent, {data: gateway});
    bottomSheet.afterDismissed().subscribe(result=>{
      if(result.id){
        this.notifier.notify("success", "Gateway details saved successfully");
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

  sortData(sort: MatSort) { 
    var gateways = this.gateways.sort(function(a, b) {
      var keyA = a[sort['active']],
      keyB = b[sort['active']];
      if(sort['active']==="bp" || sort['active']==="m"){
        keyA = keyA['name'];
        keyB = keyB['name'];
      }
      if(sort['direction']==="asc"){
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
      }else if(sort['direction']==="desc"){
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
      }
      return 0;
    });
    this.dataSource.data = gateways; 
  }
}