import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordDto } from 'src/app/shared/models/users/ForgotPasswordDto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm!: FormGroup
  public successMessage!: string;
  public showSuccess!: boolean;
 
  constructor(private _authService: AccountService) { }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }
  public forgotPassword = (forgotPasswordFormValue:any) => {
   this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/account/resetpassword'
    }
    this._authService.forgotPassword(forgotPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
      this.successMessage = 'The link has been sent, please check your email to reset your password.'
    })
  }
  }


