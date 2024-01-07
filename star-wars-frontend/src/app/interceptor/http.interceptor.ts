import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
   const apiKey = environment.apiKey
  if (apiKey) {
    req = req.clone({ headers: req.headers.set('x-api-key', apiKey) });
  }
  if (!req.headers.has('Content-Type')) {
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
  }
  req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
  return next(req);
};