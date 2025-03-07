import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.jwtService.isAuthenticated();  

    if (!isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
