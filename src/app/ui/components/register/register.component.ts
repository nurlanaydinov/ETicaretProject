import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) { }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["", [
        Validators.required
      ]],
      repeatPassword: ["", [
        Validators.required
      ]]
    },{ validators: (group: AbstractControl): Validators | null => 
    {
      let password = group.get("password").value;
      let repeatPassword = group.get("repeatPassword").value;
      return password == repeatPassword ? null :{notSame: true};
    }
    }
    )  
  }
   get component(){
      return this.frm.controls;
   }
   submitted: boolean = false;
  async onSubmit(user: User){
    this.submitted = true;
     if(this.frm.invalid)
      return;  
     const result: Create_User  = await this.userService.create(user)  

     if(result.succeeded){
        this.toastrService.message(result.message, "Successfully", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
     }
     else{
      this.toastrService.message(result.message, "Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
     }
  }
}
