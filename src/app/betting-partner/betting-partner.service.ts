import { Injectable, Inject } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class BettingPartnerService {

	bettingpartnerUrl: string;

  	constructor(
  	private http: HttpClient,
    private notifier: NotifierService
  ) {
     this.bettingpartnerUrl = environment.baseurl+'/bettingpartner';
  }

  get(): Observable<Array<any>> {
  	return this.http.get<any>(this.bettingpartnerUrl)
  		.pipe(
  			catchError(this.handleError('Get Token', null)));
  }

  add(bettingpartner): Observable<any> {
    return this.http.post<any>(this.bettingpartnerUrl, bettingpartner)
    .pipe(
       catchError(this.handleError('Add Merchant', null)));
  }

  update(bettingpartner): Observable<any> {
    return this.http.patch<any>(this.bettingpartnerUrl, bettingpartner)
      .pipe(
        catchError(this.handleError('Update Merchant', null))
      )
  }

  delete(bettingpartnerId): Observable<any> {
     return this.http.delete<any>(this.bettingpartnerUrl +'/'+ bettingpartnerId)
    .pipe(
       catchError(this.handleError('Delete Merchant', null)));
  }

  generateToken(bettingpartnerId: string): Observable<any>{
    return this.http.post<any>(this.bettingpartnerUrl +'/'+ "generatePartnerToken", {
      "partnerId": bettingpartnerId
    })
    .pipe(
       catchError(this.handleError('Generate Betting Partner Token', null))); 
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
    	if (error instanceof ErrorEvent) {
    		return throwError('Unable to submit request. Please check your internet connection.');
    	} else {
        if(error['msg']){
          this.notifier.notify("error", error['msg']);
        }else if(error['error'] && error['error']['msg']){
          this.notifier.notify("error", error['error']['msg']);
        }
    		return throwError(error);
    	}
    };
  }

}
