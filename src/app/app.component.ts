import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JWTTokenService } from './services/jwttoken.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token: string | undefined;
  constructor(private cookieService: CookieService, private jwtTokenService: JWTTokenService, private userService: UserService) {
    if (cookieService.check('token')) {
      this.token = cookieService.get('token')
      this.jwtTokenService.setToken(this.token)
      this.userService.loadInfo()
    }
  }

}
