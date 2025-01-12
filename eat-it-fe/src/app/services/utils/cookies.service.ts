import { Injectable } from '@angular/core';

import Cookies from 'js-cookie';

@Injectable({
    providedIn: 'root', 
  })
export class CookiesService{
    private tokenKey = 'jwt';  
    private userIdKey = 'userId';
    private usernameKey = 'username';

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

    getUserId(){
        return Cookies.get(this.userIdKey);
    }

    storeUserId(userId: string){
        Cookies.set(this.userIdKey, userId);
    }

    getUsername(){
        //return this.decodeToken()?.username;
        return Cookies.get(this.usernameKey);
    }

    storeUsername(username: string){
        Cookies.set(this.usernameKey, username);
    }
}