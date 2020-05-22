import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConvertInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          // Object.keys(body).map(key => {
          //   return key + 't'
          // })
          // const camelCaseObject = mapKeys(event.body, (v, k) => camelCase(k));
          // const modEvent = event.clone({ body: camelCaseObject });

          return null;
        }
      })
    );
  }
}
