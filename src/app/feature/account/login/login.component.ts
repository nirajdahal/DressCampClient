import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDto } from 'src/app/shared/models/UserForAuthenticationDto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public errorMessage: string = '';
  public showError!: boolean;
  private _returnUrl!: string;
  constructor(private _authService: AccountService , private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
  }
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }
  public loginUser = (loginFormValue : any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.email,
      password: login.password
    }
    this._authService.loginUser(userForAuth)
    .subscribe(res => {
       localStorage.setItem("token", res.token);
       this._authService.sendAuthStateChangeNotification(res.isAuthenticationSuccesfull);
       this._router.navigate([this._returnUrl]);
    })
  }
}
