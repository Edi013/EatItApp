import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { JwtService } from "../services/utils/jwt.service";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const jwtService = new JwtService();
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtService.getToken()}`),
    });

    var token = jwtService.getToken();
    
    console.log('Outgoing Request:', modifiedReq);
    console.log('Outgoing Token:', token);

    return next(modifiedReq);
};