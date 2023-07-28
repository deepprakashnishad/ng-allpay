import { 
  Component, 
  OnInit, 
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ReportService } from './report.service';
import { environment } from './../../environments/environment';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {

  startDate: string;
  endDate: string;
  transactions: Array<any> = [];

  displayedColumns: string[] = ['bp', 'm', 'pg','a','poid', 'puid', 'pum', 'pun', 'pm', 'pd', 'actions', 'status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalCount: number;
  pageSize: number = 25;

  constructor(
    private reportService: ReportService,
    private notifier: NotifierService
  ){

  }

  ngOnInit() {
    var endDate = new Date();
    var startDate = new Date(new Date().setDate(endDate.getDate()-30));
    this.endDate = `${endDate.getFullYear()}/${endDate.getMonth()+1}/${endDate.getDate()}`;
    this.startDate = `${startDate.getFullYear()}/${startDate.getMonth()+1}/${startDate.getDate()}`;
    this.fetchTransactions(startDate, endDate, 0);
  }

  ngAfterViewInit(){
    /*let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#06399d');
    gradient.addColorStop(1, '#e414db');
    this.chartColors = [
      {
        backgroundColor: gradient,
        hoverBackgroundColor: gradient
      }
    ];*/
  }

  fetchTransactions(startDate, endDate, offset: number){
    this.reportService.getTransactions(startDate, endDate, offset, this.pageSize).subscribe(result=>{
      if(result.success){
        if(offset===0){
          this.transactions = result.txns;
        }else{
          this.transactions.push(...result.txns);
        }

        this.dataSource = new MatTableDataSource<any>(this.transactions)
        this.dataSource.sort = this.sort;
      }else{
        this.notifier.notify("error", "Failed to get transactions")
      }      
    })
  }

  sortData(sort: MatSort) { this.dataSource.sort = this.sort; }
}