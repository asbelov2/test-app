import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedRoutes = ['profile', 'post']
    const notLoggedRoutes = ['login', 'register']
    if (this.userService.islogged.value) {
      return loggedRoutes.includes(route.routeConfig?.path!)
    } else {
      return notLoggedRoutes.includes(route.routeConfig?.path!)
    }
  }

}
