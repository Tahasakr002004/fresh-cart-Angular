import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "../injectionServices/auth.service";
import { Injectable } from "@angular/core";






@Injectable({ providedIn: 'root' })


export class AuthInterceptorService implements HttpInterceptor {
  // Interceptor logic here
  constructor(private authService: AuthService) {
    // Constructor logic here
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Logic to intercept HTTP requests
    this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user?.token ? user.token : '')
        });
        return next.handle(modifiedReq);
      }));
    return next.handle(req);

  }
}
