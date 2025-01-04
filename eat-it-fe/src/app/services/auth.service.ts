import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { environment} from '../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl + environment.authBaseUrl;  

  constructor(private http: HttpClient, private jwtService: JwtService) {}
  
  async login(username: string, password: string): Promise<Observable<any>> {
    const loginData = { username, password };
    const loginUrl = this.apiUrl + environment.loginUrl;
    var response = await this.http.post<{ token: string }>(loginUrl, loginData);
    // put the jwt in  jwtService.storeToken(response.token);
    // return true if jwt is present 
    return response;
  }
  
}
