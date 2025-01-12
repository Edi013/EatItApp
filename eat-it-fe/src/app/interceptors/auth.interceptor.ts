import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { CookiesService } from "../services/utils/cookies.service";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const jwtService = new CookiesService();
    const token = jwtService.getToken();

    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('Outgoing Request:', modifiedReq);
    console.log('Outgoing Token:', token);

    return next(modifiedReq);
};