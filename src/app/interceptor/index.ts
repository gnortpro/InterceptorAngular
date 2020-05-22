import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './http-bearer.interceptor';
import { CountTimeInterceptor } from './count-time-request.interceptor';
import { FakeBackendInterceptor } from './fake-backend';
import { NotificationInterceptor } from './notification.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ConvertInterceptor } from './convert-response.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CountTimeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ConvertInterceptor, multi: true },
];
