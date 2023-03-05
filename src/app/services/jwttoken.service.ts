import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {
  jwtToken?: string;
  decodedToken?: { [key: string]: string };
  constructor() {
  }
  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }
  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode.default(this.jwtToken);
    }
  }
  getDecodeToken() {
    if (this.jwtToken)
      return jwt_decode.default(this.jwtToken);
  }
  getUsername() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken["name"] : null;
  }
  getEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken["email"] : null;
  }
  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken["exp"] : null;
  }
  isTokenExpired(): boolean {
    const expiryTime: number = +(this.getExpiryTime()!);
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
  clear() {
    this.jwtToken = undefined
    this.decodedToken = undefined
  }
}
