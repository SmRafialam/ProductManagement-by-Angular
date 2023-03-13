import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(environment.apiHost)){
      const localToken = localStorage.getItem('access_token');
      //console.log(localToken);
      request = request.clone({headers: request.headers.set('Authorization','bearer ' + localToken)});
    }
    return next.handle(request);
  }
}
