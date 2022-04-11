import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpEvent,
    HttpHandler,
    HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class LoginInterceptorService implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        return this.loginService.user
        .pipe(
            take(1),
            exhaustMap(user => {
                //nếu không có user (tức là chưa đăng nhập) thì không cần thêm token vào request, lúc này người dùng chỉ truy cập được component login
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('Authorization','Bearer '+ user.token)
                   
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
