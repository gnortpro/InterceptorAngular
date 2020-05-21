import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './http-bearer.interceptor';

export const Interceptors = [
  { useClass: BasicAuthInterceptor, provide: HTTP_INTERCEPTORS, multi: true }
  //   { useClass: HttpErrorInterceptor, provide: HTTP_INTERCEPTORS, multi: true }
];
