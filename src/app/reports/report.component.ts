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
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from './../../environments/environment';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReportComponent implements OnInit, AfterViewInit {

  startDate: string;
  endDate: string;
  transactions: Array<any> = [];
  totalAmt: number = 0;

  availableColumns: any[] = [
    {"value": "bp", displayName: "Betting Partner"},
    {"value": "m", displayName: "Merchant"},
    {"value": "pg", displayName: "Payment Gateway"},
    {"value": "a", displayName: "Amount"},
    {"value": "poid", displayName: "Order Id"},
    {"value": "puid", displayName: "User Id"},
    {"value": "pum", displayName: "User Mobile"},
    {"value": "pun", displayName: "Username"},
    {"value": "pm", displayName: "Payment Mode"},
    {"value": "pd", displayName: "Payment Detail"},
    {"value": "actions", displayName: "Actions"},
    {"value": "s", displayName: "Status"}
  ];
  displayedColumns: string[] = ['bp', 'm', 'pg','a','poid', 'pun', 'pm', 's'];
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

        this.totalAmt = this.transactions.reduce((accumulator, object) => {
          return accumulator + object.a;
        }, 0);

        this.dataSource = new MatTableDataSource<any>(this.transactions)
        this.dataSource.sort = this.sort;
      }else{
        this.notifier.notify("error", "Failed to get transactions")
      }      
    })
  }

  sortData(sort: MatSort) { 
    console.log(sort);
    var transactions = this.transactions.sort(function(a, b) {
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
    this.dataSource.data = transactions; 
  }

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }
}