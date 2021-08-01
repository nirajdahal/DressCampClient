import { Injectable } from '@angular/core';
import { UserForRegistrationDto } from 'src/app/shared/models/users/userForRegistrationDto';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  LoginResponse, UserForAuthenticationDto } from 'src/app/shared/models/users/UserForAuthenticationDto';
import { BehaviorSubject, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ForgotPasswordDto } from 'src/app/shared/models/users/ForgotPasswordDto';
import { ResetPasswordDto } from 'src/app/shared/models//users/ResetPasswordDto';
import { CustomEncoder } from 'src/app/shared/CustomEncoder';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ExternalAuthDto } from 'src/app/shared/models/users/ExternalAuthDto';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAddress = environment.apiUrl;
  private _authChangeSub = new BehaviorSubject<boolean>(false)
  public authChanged = this._authChangeSub.asObservable();
  
 
  constructor(private _http: HttpClient,private _jwtHelper: JwtHelperService, private _externalAuthService: SocialAuthService)  { }

  public isUserAuthenticated = (): boolean => {
    var token = localStorage.getItem("token");
    console.log(this._jwtHelper.decodeToken(token?.toString()))
    let tokenPresent = true; 
    if(token === null){
      tokenPresent = false;
    }
    let tokenExpired = this._jwtHelper.isTokenExpired(token?.toString())
    console.log("tokenPresent", tokenPresent)
    console.log("tokenValid", tokenExpired )
    console.log(tokenPresent && !tokenExpired)
    return (tokenPresent && !tokenExpired) ;
  }

  public getCurrentUserName = (): string => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token?.toString());
    const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    return name;
    
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token?.toString());
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Admin';
  }
  
  public registerUser = ( body: UserForRegistrationDto) => {
    return this._http.post( this.urlAddress +"accounts/registration", body);
  }



  public forgotPassword = ( body: ForgotPasswordDto) => {
    return this._http.post(this.urlAddress+"accounts/forgotpassword", body);
  }


  public resetPassword = (body: ResetPasswordDto) => {
    return this._http.post(this.urlAddress+"accounts/resetPassword", body);
  }

  public testControl = () => {
    return this._http.get( this.urlAddress +"test");
  }

  public loginUser = (userForAuthenticationDto: UserForAuthenticationDto) => {

    let body = userForAuthenticationDto;
    return this._http.post<LoginResponse>(this.urlAddress +"accounts/login", body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this._http.get(this.urlAddress+"accounts/emailconfirmation", { params: params });
  }
  public signInWithGoogle = ()=> {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }
  public externalLogin = (route: string, body: ExternalAuthDto) => {
    return this._http.post<LoginResponse>(this.urlAddress +"accounts/externallogin", body);
  }

}
