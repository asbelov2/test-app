import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: 'https://asbelov2.github.io/:4200/login',
  clientId: '846639198602-b3ik1rij0ogpe0p1mngn98ulgs2gseta.apps.googleusercontent.com',
  scope: 'openid profile email',
  clearHashAfterLogin: false,
  strictDiscoveryDocumentValidation: false
}