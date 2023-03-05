import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  islogged = false;
  isloggedSub: Subscription | undefined
  constructor(private userService: UserService, private router: Router, private cookieService: CookieService, private jwtTokenService: JWTTokenService, private oauthService: OAuthService) {
  }
  ngOnInit() {
    this.isloggedSub = this.userService.islogged.subscribe((value) => {
      this.islogged = value
    })
  }
  logout() {
    this.userService.clear()
    this.cookieService.delete('token')
    this.jwtTokenService.clear()
    this.oauthService.logOut()
    this.router.navigateByUrl('/login')
  }

  ngOnDestroy() {
    this.isloggedSub?.unsubscribe()
  }
}
