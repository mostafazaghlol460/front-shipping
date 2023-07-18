import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and set the CORS headers
    const corsRequest = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*')
    });

    // Pass the cloned request to the next handler
    return next.handle(corsRequest);
  }
}
