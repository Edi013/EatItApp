import { Injectable } from '@angular/core';

import Cookies from 'js-cookie';
import { LoginResponse } from '../models/dtos/login-response';

@Injectable({
    providedIn: 'root', 
  })
export class JwtService{
    private tokenKey = 'jwt';  

    storeToken(token: string): void {
        Cookies.set(this.tokenKey, token, { expires: this.getTokenExpirationDate() });
    }
    
    getToken(): string | undefined {
        return Cookies.get(this.tokenKey);
    }

    removeToken(): void {
        Cookies.remove(this.tokenKey);
    }
    
    decodeToken(): any {
        const token = this.getToken();
        if (!token) return null;

        const payload = token.split('.')[1];  
        const decodedPayload = atob(payload); 
        return JSON.parse(decodedPayload);    
    }

    isTokenExpired(): boolean {
    if (!this.getToken()) return true;

        const currentTime = Math.floor(Date.now() / 1000); 
        return this.getTokenExpirationDate() < currentTime;  
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== undefined && !this.isTokenExpired();
    }

    getTokenExpirationDate(){
        return this.decodeToken()?.exp;
    }
}