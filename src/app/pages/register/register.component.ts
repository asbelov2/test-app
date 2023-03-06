import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import * as bcrypt from 'bcryptjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// TODO: Валидация
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {
  }
  user: User = new User(0, '', '', '')

  private _password: string | undefined
  private _passwordConfirm: string | undefined
  passwordValidation: boolean = false
  register(event: Event) {
    event.preventDefault()
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    this.http.post('https://185.26.53.195:5058/api/User/', this.user, httpOptions).subscribe((next) => {
      if ((next as User).email === this.user.email)
        this.router.navigateByUrl('/login')
    })
  }
  set password(value: string | undefined) {
    this._password = value
    if (this._password && this._password.length >= 6 && this._password.length <= 40 && this._passwordConfirm === this._password) {
      this.passwordValidation = true
      this.user.passwordHash = bcrypt.hashSync(this._password, 10)
    } else {
      this.passwordValidation = false
    }
  }
  get password(): string | undefined {
    return this._password
  }
  set passwordConfirm(value: string | undefined) {
    this._passwordConfirm = value
    if (this._password && this._password.length >= 6 && this._password.length <= 40 && this._passwordConfirm === this._password) {
      this.passwordValidation = true
      this.user.passwordHash = bcrypt.hashSync(this._password, 10)
    } else {
      this.passwordValidation = false
    }
  }
  get passwordConfirm(): string | undefined {

    return this._passwordConfirm
  }
}
