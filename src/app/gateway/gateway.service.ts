import { Injectable, Inject } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

	gatewayUrl: string;

  	constructor(
  	private http: HttpClient,
    private notifier: NotifierService
  ) {
     this.gatewayUrl = environment.baseurl+'/PaymentGateway';
  }

  get(): Observable<Array<any>> {
  	return this.http.get<any>(this.gatewayUrl)
  		.pipe(
  			catchError(this.handleError('Get Token', null)));
  }

  add(person): Observable<any> {
    return this.http.post<any>(this.gatewayUrl, person)
    .pipe(
       catchError(this.handleError('Add Gateway', null)));
  }

  update(gateway): Observable<any> {
    return this.http.patch<any>(this.gatewayUrl, gateway)
      .pipe(
        catchError(this.handleError('Update Gateway', null))
      )
  }

  delete(PersonId): Observable<any> {
     return this.http.delete<any>(this.gatewayUrl +'/'+ PersonId)
    .pipe(
       catchError(this.handleError('Delete Gateway', null)));
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
