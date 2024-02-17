import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) {  }
    IdentityCheck(){
  const token: string = localStorage.getItem("accessToken");
  //const decodeToken = this.jwtHelper.decodeToken(token);
  //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
  let expired: boolean;
  try{
    expired = this.jwtHelper.isTokenExpired(token);
  }catch{
     expired = true;
  }

  _isAuthenticated = token != null && !expired;  
 }

 get isAuthenticated(): Boolean {
  return _isAuthenticated; 
}
}

export let _isAuthenticated: boolean;