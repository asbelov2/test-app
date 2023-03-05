import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { CookieService } from 'ngx-cookie-service';
import { authConfig } from 'src/app/auth.config';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { UserService } from 'src/app/services/user.service';

// TODO: Валидация
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: string | undefined
  password: string | undefined
  email: string | undefined
  constructor(private http: HttpClient, private cookieService: CookieService, private jwtTokenService: JWTTokenService, private userService: UserService, private router: Router, private oauthService: OAuthService, private activatedRoute: ActivatedRoute) {
    this.configure().then(() => {
      this.activatedRoute.fragment.subscribe(params => {
        if (params?.length) {
          let info = params?.split('&').map(x => x.split('='))
          this.http.get(`http://185.26.53.195:5058/api/user/CheckEmail?email=${this.oauthService.getIdentityClaims()["email"]}`).subscribe(next => {
            this.cookieService.set('token', this.oauthService.getIdToken())
            this.jwtTokenService.setToken(this.oauthService.getIdToken())
            this.userService.loadInfo()
            this.userService.loggedByGoogle.next(true)
            this.userService.avatar = this.oauthService.getIdentityClaims()["picture"];
            this.router.navigateByUrl('/profile')
          })
        }
      })
    })

  }

  ngOnInit() {

  }

  login(event: Event) {
    event.preventDefault()
    const options = {
      responseType: 'text' as const,
    };
    this.http.get(`http://185.26.53.195:5058/login?email=${this.email}&password=${this.password}`, options).subscribe(next => {
      this.token = next
      this.cookieService.set('token', this.token)
      this.jwtTokenService.setToken(this.token)
      this.userService.loadInfo()
      this.router.navigateByUrl('/profile')
    })
  }
  private async configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  handleLoginClick = () => {
    if (!this.userService.islogged.value) {
      this.oauthService.initLoginFlow()
    }
  }
}
