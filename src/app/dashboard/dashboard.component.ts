import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReportService } from './../reports/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{

  startDate: string;
  endDate: string;

  @ViewChild("myCanvas", {static: false}) canvas: ElementRef;

  chartColors: any[] = [];

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
  }

  ngAfterViewInit(){
    let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#06399d');
    gradient.addColorStop(1, '#e414db');
    this.chartColors = [
      {
        backgroundColor: gradient,
        hoverBackgroundColor: gradient
      }
    ];
  }

  getTransactionDailyReport(): void{
    this.reportService.getDailyReport(this.startDate, this.endDate).subscribe(result=>{
      if(result['success']){
        var transactions = result.txns;
        for(var i=0;i<transactions.length;i++){
          this.barChartLabels.push(transactions[i]._id);
          this.barChartData[0].data.push(transactions[i].amt);
        }
      }
    });
  }
}
