import { Injectable, Inject } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportUrl:string;

  constructor(
    private http: HttpClient, 
    private notifier: NotifierService
  ){
    this.reportUrl = environment.baseurl+'/Report';  
  }

  getTransactions(startDate: string, endDate: string, offset: number=0, pageSize: number=50): Observable<any> {
    if(!startDate){
      var currDate = new Date();
      startDate = `${currDate.getFullYear()}/${currDate.getMonth()+1}/${currDate.getDate()}`;
    }
    return this.http.get<any>(`${this.reportUrl}/transaction?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`)
      .pipe(
        catchError(this.handleError('Get Daily Report', null)));
  }
  

  getDailyReport(startDate: string, endDate: string, selectedPeriod: string = "daily"): Observable<any> {
    if(!startDate){
      var currDate = new Date();
      startDate = `${currDate.getFullYear()}/${currDate.getMonth()+1}/${currDate.getDate()}`;
    }
    return this.http.get<any>(`${this.reportUrl}/daily-transaction-report?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}&period=${selectedPeriod}`)
      .pipe(
        catchError(this.handleError('Get Daily Report', null)));
  }

  getMerchantPGSummary(): Observable<any>{
    return this.http.get<any>(`${this.reportUrl}/merchant-pg-summary`)
      .pipe(
        catchError(this.handleError('Get Merchant-PG-Summary', null))); 
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      if (error instanceof ErrorEvent) {
        return throwError('Unable to submit request. Please check your internet connection.');
      } else {
        if(error['msg']){
          this.notifier.notify("error", error['msg']);
        }
        return throwError(error);
      }
    };
  }
}