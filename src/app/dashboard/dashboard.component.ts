import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReportService } from './../reports/report.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{

  startDate: string;
  endDate: string;

  transactions: Array<any> = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["pg", "m", "status", "dcoll", "wcoll", "mcoll"];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild("myCanvas", {static: false}) canvas: ElementRef;

  chartColors: any[] = [];

  selectedPeriod:string = 'daily';

  numOfTransactions: number = 0;
  totalAmt: number=0;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Transaction Amount'
         },
         ticks: {
            beginAtZero: true
         }
      }]
    },
    maintainAspectRatio: false
  };

  public barChartLabels:Array<string> = [];

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: 'Transaction Amount'}
  ];
   
  constructor(
    private router: Router,
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
    var endDate = new Date();
    var startDate = new Date(new Date().setDate(endDate.getDate()-30));
    this.endDate = `${endDate.getFullYear()}/${endDate.getMonth()+1}/${endDate.getDate()}`;
    this.startDate = `${startDate.getFullYear()}/${startDate.getMonth()+1}/${startDate.getDate()}`;

    this.getTransactionDailyReport();

    this.reportService.getMerchantPGSummary().subscribe(result=>{
      if(result.success){
        this.transactions = result.txns;
        this.dataSource = new MatTableDataSource<any>(this.transactions)
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit(){
    let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(1, '#20bf55');
    gradient.addColorStop(0, '#01baef');
    this.chartColors = [
      {
        backgroundColor: gradient
      }
    ];
  }

  periodSelected(period){
    this.selectedPeriod = period;
    this.getTransactionDailyReport();
  }

  getTransactionDailyReport(): void{
    this.reportService.getDailyReport(this.startDate, this.endDate, this.selectedPeriod).subscribe(result=>{
      if(result['success']){
        var transactions = result.txns;
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        for(var i=0;i<transactions.length;i++){
          this.barChartLabels.push(transactions[i]._id);
          this.barChartData[0].data.push(transactions[i].amt);
        }

        this.totalAmt = 0;
        this.numOfTransactions = 0;
        transactions.forEach(data=>{
          this.totalAmt = this.totalAmt + data.amt;
          this.numOfTransactions = this.numOfTransactions + data.cnt;
        })
      }
    });
  }

  sortData(sort: MatSort) { 
    this.transactions = this.transactions.sort(function(a, b) {
      var keyA = a[sort['active']],
      keyB = b[sort['active']];
      if(sort['active']==="pg" || sort['active']==="m"){
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
    this.dataSource.data = this.transactions; 
  }
}
