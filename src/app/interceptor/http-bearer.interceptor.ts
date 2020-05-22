import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/loading.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(
  private authenticationService: AuthenticationService, 
  private toastr: ToastrService, 
  private spinnerService: SpinnerService
  ) {}

  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.spinnerService.show();
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.authdata;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8 ',
          Authorization: `Bearer ${user.authdata}`
        }
      });
    }
    return next.handle(request).pipe(
        tap( event => {
            if (event instanceof HttpResponse) {
                if (event && event.status === 200) {
                    this.toastr.success('Success!');
                }
            }
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.spinnerService.hide();
          }
        }),
        catchError((err: any) => {
          if (err && err.error.message) {
            this.toastr.error(err.error.message);
          }
          return of(err);
        })
    );
  }
}
