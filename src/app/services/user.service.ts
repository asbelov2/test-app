import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { JWTTokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username?: string
  email?: string
  avatar?: string
  loggedByGoogle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  islogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private jwtTokenService: JWTTokenService, private cookieService: CookieService) {
    this.loadInfo()
  }

  loadInfo() {
    if (this.jwtTokenService.jwtToken) {
      this.username = this.jwtTokenService.getUsername()!
      this.email = this.jwtTokenService.getEmail()!
      this.islogged.next(true)
    }
  }

  clear() {
    this.username = undefined
    this.email = undefined
    this.avatar = undefined
    this.loggedByGoogle.next(false)
    this.islogged.next(false)
  }
}
