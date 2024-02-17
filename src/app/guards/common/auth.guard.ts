import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

const jwtHelper = new JwtHelperService();
// const toatrService = new CustomToastrService();
const spinner = new NgxSpinnerService(); 
export const authGuard: CanActivateFn = (route, state) => {
  
  spinner.show(SpinnerType.BallAtom);
  // const token: string = localStorage.getItem("accessToken");
  //  //const decodeToken = jwtHelper.decodeToken(token);
  //  //const expirationDate: Date = jwtHelper.getTokenExpirationDate(token);
  //  let expired: boolean;
  //  try{
  //    expired = jwtHelper.isTokenExpired(token);
  //  }catch{
  //     expired = true;
  //  }
   if(!_isAuthenticated){
    
    inject(Router).navigate(["login"], {queryParams: {returnUrl: state.url }});
    // toatrService.message("You must be Login", "Login Permission", {
    //  messageType: ToastrMessageType.Warning,
    //  position: ToastrPosition.TopRight  
    // })
   }
   spinner.hide(SpinnerType.BallAtom);
  return true;
};
