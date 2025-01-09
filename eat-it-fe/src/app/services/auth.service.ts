import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment'
import { LoginResponse } from '../models/responses/login-response';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '../models/responses/base-response';
import { JwtService } from './utils/jwt.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private apiUrl = environment.baseUrl + environment.authBaseUrl;  

  constructor(private http: HttpClient, private jwtService: JwtService) {}
  
  async login(username: string, password: string): Promise<LoginResponse>{
    const loginData = { username, password };
    const loginUrl = this.apiUrl + environment.loginUrl;
    var httpResponse = await firstValueFrom(this.http.post<LoginResponse>(loginUrl, loginData));
    var response: LoginResponse = new LoginResponse(httpResponse.statusCode, httpResponse.message, httpResponse.status, httpResponse.token || "");
    if(!response || response.token ===  undefined){
      console.log("Login failed. Parsing error.")  
      return LoginResponse.failedResponse("Parsing error.");
    }
    
    if(response.hasFailed() && response.token === ""){
      console.log("Login failed.")
      return response;
    }
    
    this.jwtService.storeToken(response.token);
    console.log("Login succeeded.")
    return response;
  }

  async register(username: string, password: string): Promise<BaseResponse>{
    const registerData = {username, password}
    const registerUrl = this.apiUrl + environment.registerUrl;
    const response = await firstValueFrom(this.http.post<BaseResponse>(registerUrl, registerData));

    if(!(response instanceof BaseResponse)){
      console.log("Register failed. Parsing error.")  
      return BaseResponse.failedResponse("Parsing error.");
    }

    if(response.hasFailed())
    {
      console.log("Register failed.")
      return response;
    }
    
    console.log("Register succeeded.")
    return response;
  }

  logout(){
    this.jwtService.removeToken();
  }
}
