import { Component, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BettingPartnerService} from './betting-partner.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../environments/environment';
import { BettingPartnerEditorComponent } from './betting-partner-editor/betting-partner-editor.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BettingPartner} from './betting-partner';

@Component({
  selector: 'app-betting-partner',
  templateUrl: './betting-partner.component.html',
  styleUrls: ['./betting-partner.component.scss']
})
export class BettingPartnerComponent implements OnInit {

  bettingpartners: Array<BettingPartner> = [];
  displayedColumns: string[] = ['name', 'website', 'status','actions'];

  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private mService: BettingPartnerService,
    private _bottomSheet: MatBottomSheet,
    private notifier: NotifierService 
  ){

  }

  ngOnInit() {
    this.fetchMerchant();
  }

  sortData(sort: MatSort) { 
    var bettingpartners = this.bettingpartners.sort(function(a, b) {
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
    this.dataSource.data = bettingpartners; 
  }

  fetchMerchant(){
    this.mService.get().subscribe(results=>{
      this.bettingpartners = results;

      this.dataSource = new MatTableDataSource<any>(this.bettingpartners)
      this.dataSource.sort = this.sort;
    });
  }

  openMerchantEditor(bettingpartner: BettingPartner, index: number = -1){
    const bottomSheet = this._bottomSheet.open(BettingPartnerEditorComponent, {data: bettingpartner});
    bottomSheet.afterDismissed().subscribe(result=>{
      console.log(result);
      if(result.id){
        this.notifier.notify("success", "BettingPartner details saved successfully");
        console.log(index);
        if(index===-1){
          this.bettingpartners.push(result);
        }else{
          this.bettingpartners[index] = result;  
        }
      }
    });
  }

  deleteMerchant(bettingpartner, i){
    this.mService.delete(bettingpartner.id).subscribe(result=>{
      if(result['success']){
        this.notifier.notify("success", `${bettingpartner.name} deleted successfully`);
        this.bettingpartners.splice(i, 1);
      }
    });
  }
}