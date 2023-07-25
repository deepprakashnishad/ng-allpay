import { Injectable, Inject } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

	merchantUrl: string;

  	constructor(
  	private http: HttpClient,
    private notifier: NotifierService
  ) {
     this.merchantUrl = environment.baseurl+'/merchant';
  }

  get(): Observable<Array<any>> {
  	return this.http.get<any>(this.merchantUrl)
  		.pipe(
  			catchError(this.handleError('Get Token', null)));
  }

  add(merchant): Observable<any> {
    return this.http.post<any>(this.merchantUrl, merchant)
    .pipe(
       catchError(this.handleError('Add Merchant', null)));
  }

  update(merchant): Observable<any> {
    return this.http.patch<any>(this.merchantUrl, merchant)
      .pipe(
        catchError(this.handleError('Update Merchant', null))
      )
  }

  delete(merchantId): Observable<any> {
     return this.http.delete<any>(this.merchantUrl +'/'+ merchantId)
    .pipe(
       catchError(this.handleError('Delete Merchant', null)));
  }

  generateToken(mid: string): Observable<any>{
    return this.http.post<any>(this.merchantUrl +'/'+ "generateMerchantToken", {
      "mid": mid
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
