import { Component, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MerchantService} from './merchant.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../environments/environment';
import { MerchantEditorComponent } from './merchant-editor/merchant-editor.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
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

  displayedColumns: string[] = ['name', 'website', 'status','actions'];

  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private mService: MerchantService,
    private _bottomSheet: MatBottomSheet,
    private notifier: NotifierService 
  ){

  }

  ngOnInit() {
    this.fetchMerchant();
  }

  sortData(sort: MatSort) { 
    var merchants = this.merchants.sort(function(a, b) {
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
    this.dataSource.data = merchants; 
  }

  fetchMerchant(){
    this.mService.get().subscribe(results=>{
      this.merchants = results;

      this.dataSource = new MatTableDataSource<any>(this.merchants)
      this.dataSource.sort = this.sort;
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
          this.dataSource.data = this.merchants;
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
        this.dataSource.data = this.merchants;
      }
    });
  }
}