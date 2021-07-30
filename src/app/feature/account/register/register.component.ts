import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';
import { UserForRegistrationDto } from 'src/app/shared/models/userForRegistrationDto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  constructor(private _authService: AccountService, private _passConfValidator: PasswordConfirmationValidatorService) { }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });

    this.registerForm.get('confirm').setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
  }
  
  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }
  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };
    this._authService.registerUser( user)
    .subscribe(_ => {
      console.log("Successful registration");
    },
    error => {
      console.log(error);
    })
  }
}

