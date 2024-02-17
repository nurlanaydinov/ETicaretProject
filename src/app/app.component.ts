import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router) {
   
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.IdentityCheck();
    this.router.navigate([""]);
     this.toastrService.message("Log out", "Log out is success", {
     messageType: ToastrMessageType.Warning,
     position: ToastrPosition.TopRight  
    });
  }
}


  
