import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { environment} from '../environments/environment'
import { LoginResponse } from '../models/dtos/login-response';
import { RegisterResponse } from '../models/dtos/register-response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private apiUrl = environment.baseUrl + environment.authBaseUrl;  

  constructor(private http: HttpClient, private jwtService: JwtService) {}
  
  async login(username: string, password: string): Promise<LoginResponse>{
    const loginData = { username, password };
    const loginUrl = this.apiUrl + environment.loginUrl;
    var httpResult = 
        await this.http.post<LoginResponse>(loginUrl, loginData);
    httpResult.subscribe(value => {this.jwtService.storeToken(value.token); console.log(value)});
    var response = await firstValueFrom(httpResult);
    if(!(response instanceof  LoginResponse)){ return LoginResponse.failedResponse("Login failed.");}

    return response;
  }

  async register(username: string, password: string): Promise<RegisterResponse>{
    const registerData = {username, password}
    const registerUrl = this.apiUrl + environment.registerUrl;
    const response = await firstValueFrom(this.http.post<any>(registerUrl, registerData));
    console.log(response);
    if(!(response instanceof  RegisterResponse)){ return RegisterResponse.failedResponse("Registration failed.");}

    return response;
  }

  logout(){
    this.jwtService.removeToken();
  }
}
