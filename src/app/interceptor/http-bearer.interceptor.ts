import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService) {}

  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.authdata;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
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
        catchError((err: any) => {
             if (err instanceof HttpErrorResponse) {
                try {
                    this.toastr.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
                } catch(e) {
                    this.toastr.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                }
             }
             return of(err);
        })
    );
  }
}
