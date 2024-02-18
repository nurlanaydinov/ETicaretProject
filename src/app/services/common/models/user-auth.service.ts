import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
        controller:"auth",
        action: "login"
      }, { usernameOrEmail, password })

    const tokenResponse: TokenResponse =  await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken); 
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 
        this.toastrService.message("Login Successfuly", "Successfully", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
    }
      
      callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: ()=>void): Promise<any>{
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshTokenLogin",
      controller: "auth"
    },{ refreshToken: refreshToken });
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken); 
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 
       
    }
      
      callBackFunction();
  }

 async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

   const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

   if(tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken); 
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 

    this.toastrService.message("Google Login is successfully", "Google Login Success", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "facebook-login",
      controller: "auth"
    }, user);

   const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

   if(tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken); 
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 

    this.toastrService.message("Facebook Login is successfully", "Facebook Login Success", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });

    callBackFunction();
  }
}
